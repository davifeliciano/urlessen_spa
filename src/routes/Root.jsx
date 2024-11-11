import styled from "styled-components";
import Header from "../components/Header.jsx";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <Container>
      <Header />
      <OutletContainer>
        <Outlet />
      </OutletContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  min-width: 500px;

  @media (max-width: 500px) {
    min-width: auto;
  }
`;

const OutletContainer = styled.div`
  margin-inline: auto;
`;
