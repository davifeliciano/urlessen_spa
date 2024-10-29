import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import {
  Link,
  useNavigation,
  useNavigate,
  useActionData,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../components/Toast.jsx";
import FormContainer from "../components/FormContainer.jsx";
import FormHeading from "../components/FormHeading.jsx";
import Form from "../components/Form.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import SubmitLoader from "../components/SubmitLoader.jsx";
import useAuth from "../hooks/useAuth.js";
import { loginSchema } from "../schemas/auth.schemas.js";
import axios, { HttpStatusCode } from "../api/axios.js";

export async function action({ request }) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  const { error, value } = loginSchema.validate(form);

  if (error) {
    toast(error.message);
    return null;
  }

  const body = value;

  try {
    const { data } = await axios.post("/auth/signin", body, {
      withCredentials: true,
    });

    return data;
  } catch (err) {
    switch (err.response?.status) {
      case HttpStatusCode.Unauthorized:
        toast("Invalid credentials.");
        break;

      default:
        console.error(err);
        toast("Unexpected error. Try again.");
        break;
    }

    return null;
  }
}

export default function Login() {
  const { auth, setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");
  const from = useRef(location.state?.from?.pathname);
  const fromState = useRef(location.state ?? null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoading =
    navigation.state === "submitting" || navigation.state === "loading";

  useEffect(() => {
    if (actionData) {
      setAuth(actionData);
    }
  }, [actionData]);

  useEffect(() => {
    if (auth) {
      navigate(from.current || `/usr/${auth.username}`, {
        state: fromState.current,
      });
    }

    switch (reason) {
      case "newuser":
        toast("User created successfully! You can login now.");
        break;

      case "denied":
        toast("You must login to access this page.");
        break;
    }
  }, [auth]);

  return (
    <>
      <Toast />
      <Container>
        <FormContainer>
          <FormHeading />
          <Form method="post">
            <Input
              type="text"
              name="username"
              placeholder="username"
              disabled={isLoading}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              type="password"
              name="password"
              placeholder="senha"
              disabled={isLoading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <SubmitLoader /> : "Login"}
            </Button>
          </Form>
          <span>
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </span>
        </FormContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-inline: auto;
  width: 40rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
`;
