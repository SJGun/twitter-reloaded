import { createUserWithEmailAndPassword, updateProfile, getAuth } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { FirebaseError } from 'firebase/app';
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import SocialButtons from '../components/social-buttons';


export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("")
    if (isLoading || name === "" || email === "" || password === "") return;
    setLoading(true); // 로딩 상태 시작
    try {
      //계정 생성
      const credentials = await createUserWithEmailAndPassword(auth, email, password);
      //유저 프로필
      console.log(credentials.user);
      await updateProfile(credentials.user, { displayName: name });
      //redirect home
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError)
        console.log(e.code,e.message)
      setError(e.message); // 에러 메시지 설정
    } finally {
      setLoading(false); // 로딩 상태 종료
    }
    console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Title>회원가입 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading.." : "회원가입"}
        />
      </Form>
      {error !=="" ? <Error>{error}</Error>:null}
      <Switcher>
        계정이 있으신가요?{" "}
        <Link to="/login">로그인</Link>
      </Switcher>
      <SocialButtons/>
    </Wrapper>
  );
}
