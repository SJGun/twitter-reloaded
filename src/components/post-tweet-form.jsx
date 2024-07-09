import { addDoc, collection, updateDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import styled from 'styled-components'
import { auth, db, storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`
const AttachFileButton = styled.label`
  svg {
    width: 30px;
    height: 30px;
    color: #1d9bf0;
  }
`
const AttachFileInput = styled.input`
  display: none;
`
const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`

export default function PostTweetForm() {
    const [isLoading, setLoading] = useState(false);
    const [tweet, setTweet] = useState("");
    const [file, setFile] = useState(null);

    const onChange = (e) => {
        setTweet(e.target.value);
    };

    const onFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            setFile(files[0]);
        }
    };
    const onSubmit = async (e) => {
        e.preventDefault()
        const user = auth.currentUser
        if (!user || isLoading || tweet === "" || tweet.length > 180) return
        try {
            setLoading(true)
            const docRef = await addDoc(collection(db, "tweets"), {
                tweet,
                createAt: Date.now(),
                username: user.displayName || "Anonymous",
                userId: user.uid,
            })
            if (file) {
                const locationRef = ref(storage, `tweets/${user.uid}-${user.displayName}/${docRef.id}`)
                const result = await uploadBytes(locationRef, file)
                const url = await getDownloadURL(result.ref)
                await updateDoc(docRef, {
                    photo: url,
                });
            }
            setTweet("")
            setFile(null)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <Form onSubmit={onSubmit}>
            <TextArea
                required
                rows={5}
                maxLength={180}
                onChange={onChange} value={tweet} placeholder="무슨 일이 일어나고 있나요?" />
            <AttachFileButton htmlFor="file">{file ? "업로드 됨✅" : <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
            </svg>}

            </AttachFileButton>
            <AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" onChange={onFileChange} />
            <SubmitBtn type="submit" value={isLoading ? "게시중..." : "게시하기"} />
        </Form>
    );
}
