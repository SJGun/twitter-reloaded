import React, { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import GithubButton from './../components/github-btn';
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GoogleButton from "../components/google-btn";
import SocialButtons from "../components/social-buttons";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e.code) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>로그인 𝕏</Title>
      <Form onSubmit={onSubmit}>
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
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "로그인"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        계정이 없으신가요?{" "}
        <Link to="/create-account">회원가입</Link>
      </Switcher>
      <SocialButtons/>
    </Wrapper>
  );
}
