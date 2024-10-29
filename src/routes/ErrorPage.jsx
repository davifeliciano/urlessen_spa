import styled from "styled-components";
import { useRouteError } from "react-router-dom";
import heading from "../assets/urlessen.svg";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Container>
      <img className="heading" src={heading} alt="urlessen logo" />
      <p>The following error occurred during the loading of this page.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: 15rem 10rem;

  & p {
    font-size: 1.4rem;
  }

  & img.heading {
    height: 4rem;
  }

  & img.logo {
    height: 10rem;
  }
`;
