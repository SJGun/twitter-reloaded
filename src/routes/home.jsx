import React from 'react'
import { auth } from '../firebase'
import PostTweetForm from '../components/post-tweet-form'
import styled from 'styled-components';
import Timeline from './../components/timeline';

const Wrapper = styled.div`
  display: grid;
  gap: 50x;
  /* overflow-y:scroll; */
  /* grid-template-rows:1fr 5fr ; */
`
export default function Home() {




  return (
    <Wrapper>
      <PostTweetForm />
      <Timeline/>
    </Wrapper>
  )
}
