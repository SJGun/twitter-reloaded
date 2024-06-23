import React from 'react';
import GithubButton from './github-btn';
import GoogleButton from './google-btn';
import styled from 'styled-components';

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

export default function SocialButtons() {
  return (
    <ButtonContainer>
      <GithubButton />
      <GoogleButton />
    </ButtonContainer>
  );
}
