import styled from "styled-components";
import heading from "../assets/urlessen.svg";

export default function FormHeading() {
  return (
    <Container>
      <img className="heading" src={heading} alt="urlessen logo" />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 1rem;
  height: 4rem;

  & img {
    height: 100%;
    width: auto;
    user-select: none;
    -webkit-user-drag: none;
  }

  & img.heading {
    height: 2rem;
  }
`;
