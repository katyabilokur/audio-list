"use client";
import Link from "next/link";
import styled from "styled-components";

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  a {
    color: red;
  }
`;

export default function HomeIntro() {
  return (
    <MainSection>
      <h1>MyList</h1>
      <p>Please login first to use Audio List App</p>
      <Link href="/login">Log in</Link>
      <p>Some little app description to be here</p>
    </MainSection>
  );
}
