import styled from "styled-components";
import useAuth from "../hooks/useAuth.js";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function UserUrls() {
  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      return navigate("/login?reason=denied", {
        state: { from: location },
        replace: true,
      });
    }
  }, [auth]);

  return (
    <pre>
      <AuthJSON>
        {JSON.stringify({ ...auth, token: undefined }, null, 2)}
      </AuthJSON>
    </pre>
  );
}

const AuthJSON = styled.code`
  font-size: 1.5rem;
  overflow-wrap: break-word;
`;
