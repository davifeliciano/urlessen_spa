import dayjs from "dayjs";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

function CreatedAtAndUpdatedAtDates({ url }) {
  if (url.createdAt === url.updatedAt) {
    return <Date>{dayjs.utc(url.createdAt).fromNow()}</Date>;
  }

  return (
    <Date>{`${dayjs.utc(url.createdAt).fromNow()}, updated ${dayjs
      .utc(url.updatedAt)
      .fromNow()}`}</Date>
  );
}

export default function UrlCard({ url }) {
  return (
    <Container>
      <CardHeader>
        <h2>{url.title}</h2>
        <UrlActions>
          <button>
            <Link to={`/urls/${url.id}/edit`}>
              <AiOutlineEdit />
            </Link>
          </button>
          <button>
            <Link to={`/urls/${url.id}/delete`}>
              <AiOutlineDelete />
            </Link>
          </button>
        </UrlActions>
      </CardHeader>
      <CardContent>
        <p>
          <b>Description: </b>
          {url.description}
        </p>
        <LongUrl>
          <b>URL: </b>
          {url.longUrl}
        </LongUrl>
        <p>
          <b>Short URL: </b>
          <a href="#">{url.shortUrl}</a>
        </p>
        <p>
          <b>Times visited: </b>
          {url.timesVisited}
        </p>
      </CardContent>
      <CardFooter>
        <CreatedAtAndUpdatedAtDates url={url} />
      </CardFooter>
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
  font-size: 1.4rem;

  @media (max-width: 768px) {
    border-radius: 0px;
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 1rem;
`;

const UrlActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-block: 1rem;

  & button {
    height: 2.5rem;
    aspect-ratio: 1 / 1;
    padding: 0;
    background-color: transparent;
    border: none;
  }

  & svg {
    height: 2.5rem;
    width: 2.5rem;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 1rem;

  & a {
    text-decoration: underline;
  }
`;

const LongUrl = styled.p`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const CardFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-inline: 1rem;
`;

const Date = styled.div`
  padding-block: 5px;
  font-size: 1rem;
  text-transform: uppercase;
`;
