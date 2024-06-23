import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';
import { Button, Logo } from './ButtonStyles';
import { useNavigate } from 'react-router-dom';

export default function GithubButton() {
    const navigate = useNavigate()
    const onClick = async () => {
        try {
            const provider = new GithubAuthProvider();
            await signInWithPopup(auth, provider);
            navigate("/")
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Button onClick={onClick}>
            <Logo src="/github-logo.svg" />
            Github 로 로그인
        </Button>
    );
}
