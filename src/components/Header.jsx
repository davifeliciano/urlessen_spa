import styled from "styled-components";
import logo from "../assets/urlessen.svg";
import useAuth from "../hooks/useAuth.js";
import { Link, NavLink } from "react-router-dom";

function NavItems({ auth }) {
  const className = ({ isActive, isPending }) =>
    isActive ? "active" : isPending ? "pending" : "";

  if (!auth) {
    return (
      <>
        <NavLink to={"/login"} className={className}>
          Login
        </NavLink>
        <NavLink to={"/signup"} className={className}>
          Sign Up
        </NavLink>
      </>
    );
  }

  return (
    <NavLink to={"/logout"} className={className}>
      Logout
    </NavLink>
  );
}

export default function Header() {
  const { auth } = useAuth();

  return (
    <HeaderContainer>
      <HeaderLogo>
        <Link to={"/"}>
          <img src={logo} alt="urlessen" />
        </Link>
      </HeaderLogo>
      <Nav>
        <NavItems auth={auth} />
      </Nav>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 10rem;

  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});

  @media (max-width: 768px) {
    padding-inline: 5rem;
  }
`;

const HeaderLogo = styled.div`
  height: 2.5rem;

  & img {
    height: 100%;
    width: auto;
    user-select: none;
    -webkit-user-drag: none;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  & a {
    font-size: 1.8rem;
  }

  & a.active {
    color: ${(props) => props.theme.secondary};
  }
`;
