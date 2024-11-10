import styled, { useTheme } from "styled-components";
import useAuth from "../hooks/useAuth.js";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import UrlCard from "../components/UrlCard.jsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NewUrlButton from "../components/NewUrlButton.jsx";
import Button from "../components/Button.jsx";
import SubmitLoader from "../components/SubmitLoader.jsx";

export default function DeleteUrl() {
  const theme = useTheme();
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { urlId } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [url, setUrl] = useState([]);
  const [isUrlLoading, setIsUrlLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    if (!auth) {
      return navigate("/login?reason=denied", {
        state: { from: location },
        replace: true,
      });
    }
  }, [auth]);

  useEffect(() => {
    if (!urlId) return;
    setIsUrlLoading(true);

    axiosPrivate
      .get(`/urls/${urlId}`)
      .then((res) => {
        setUrl(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/login?reason=denied", {
          state: { from: location },
          replace: true,
        });
      })
      .finally(() => setIsUrlLoading(false));
  }, []);

  function handleDelete() {
    setIsDeleteLoading(true);

    axiosPrivate
      .delete(`/urls/${urlId}`)
      .then(() => {
        navigate(`/usr/${auth.username}`, { replace: true });
      })
      .catch((err) => {
        console.error(err);
        navigate("/login?reason=denied", {
          state: { from: location },
          replace: true,
        });
      })
      .finally(() => setIsDeleteLoading(false));
  }

  return (
    <>
      <UrlsContainer>
        <div>
          <h2>Are you sure you want to delete the URL below?</h2>
          <p>This cannot revert this action</p>
        </div>
        {isUrlLoading ? (
          <Skeleton
            height={100}
            count={1}
            borderRadius={5}
            highlightColor={theme.skeletonLoaderMain}
          />
        ) : (
          <UrlCard url={url} />
        )}
        <Button
          disabled={isDeleteLoading || isUrlLoading}
          onClick={handleDelete}
        >
          {isDeleteLoading ? <SubmitLoader /> : "Confirm Deletion"}
        </Button>
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
