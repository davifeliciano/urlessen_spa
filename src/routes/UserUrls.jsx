import styled, { useTheme } from "styled-components";
import useAuth from "../hooks/useAuth.js";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import UrlCard from "../components/UrlCard.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NewUrlButton from "../components/NewUrlButton.jsx";

export default function UserUrls() {
  const theme = useTheme();
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [urls, setUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!auth) {
      return navigate("/login?reason=denied", {
        state: { from: location },
        replace: true,
      });
    }
  }, [auth]);

  useEffect(() => {
    if (!username) return;
    setIsLoading(true);

    axiosPrivate
      .get(`/users/${username}/urls`)
      .then((res) => {
        setUrls(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login?reason=denied", {
          state: { from: location },
          replace: true,
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <UrlsContainer>
        {urls.length !== 0 ? (
          urls.map((url) => <UrlCard key={url.id} url={url} />)
        ) : isLoading ? (
          <Skeleton
            height={100}
            count={1}
            borderRadius={5}
            highlightColor={theme.skeletonLoaderMain}
          />
        ) : (
          <span>No URLs yet...</span>
        )}
      </UrlsContainer>
      <NewUrlButton />
    </>
  );
}

const UrlsContainer = styled.main`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 60rem;

  & > span {
    font-size: 1.5rem;
  }

  @media (max-width: 768px) {
    width: 100vw;
  }
`;
