import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';
import { Button, Logo } from './ButtonStyles';
import { useNavigate } from 'react-router-dom';

export default function GoogleButton() {
    const navigate = useNavigate()

  const onClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/")

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button onClick={onClick}>
      <Logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png" />
      Google 로 로그인
    </Button>
  );
}
