"use client";
import Link from "next/link";
import styled from "styled-components";

const NavigationBar = styled.nav`
  background-color: rosybrown;
`;

const NavigationMenu = styled.ul`
  display: flex;
  justify-content: space-evenly;
  list-style: none;

  img {
    border-radius: 100px;
    height: 2rem;
  }
`;

export default function Navigation({ image, name }) {
  return (
    <NavigationBar>
      <NavigationMenu>
        <li>
          <Link href="/">Logo</Link>
        </li>
        <li>My List</li>
        <li>
          <Link href="/account">
            <img src={image} alt={name} referrerPolicy="no-referrer" />
            <span>My account</span>
          </Link>
        </li>
      </NavigationMenu>
    </NavigationBar>
  );
}
