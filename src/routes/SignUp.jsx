import styled from "styled-components";
import { useState } from "react";
import { Link, redirect, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import Toast from "../components/Toast.jsx";
import FormContainer from "../components/FormContainer.jsx";
import FormHeading from "../components/FormHeading.jsx";
import Form from "../components/Form.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import SubmitLoader from "../components/SubmitLoader.jsx";
import { signUpSchema } from "../schemas/auth.schemas.js";
import axios, { HttpStatusCode } from "../api/axios.js";

export async function action({ request }) {
  const formData = await request.formData();
  const form = Object.fromEntries(formData);
  const { error, value } = signUpSchema.validate(form);

  if (error) {
    toast(error.message);
    return null;
  }

  const body = value;

  try {
    await axios.post("/auth/signup", body);
    return redirect("/login?reason=newuser");
  } catch (err) {
    switch (err.response?.status) {
      case HttpStatusCode.UnprocessableEntity:
        toast(
          'Invalid format. "username" must have between 3 and 32 characters (letters, numbers, - and _ are allowed) and "password" must have at least 8 characters, at least one letter, one number and one special character.'
        );
        break;

      case HttpStatusCode.Conflict:
        toast("There is already an user with this username.");
        break;

      default:
        console.error(err);
        toast("Unexpected error. Try again.");
        break;
    }

    return null;
  }
}

export default function SignUp() {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    username: "",
    password: "",
    passwordConfirm: "",
  });

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
              disabled={navigation.state === "submitting"}
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <Input
              type="password"
              name="password"
              placeholder="password"
              disabled={navigation.state === "submitting"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <Input
              type="password"
              name="passwordCheck"
              placeholder="confirm password"
              disabled={navigation.state === "submitting"}
              value={form.passwordConfirm}
              onChange={(e) =>
                setForm({ ...form, passwordConfirm: e.target.value })
              }
            />
            <Button type="submit" disabled={navigation.state === "submitting"}>
              {navigation.state === "submitting" ? <SubmitLoader /> : "Sign Up"}
            </Button>
          </Form>
          <span>
            Already have an account? <Link to="/login">Login</Link>
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
