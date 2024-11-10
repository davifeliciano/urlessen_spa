import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth.js";
import Toast from "../components/Toast.jsx";
import FormContainer from "../components/FormContainer.jsx";
import Form from "../components/Form.jsx";
import Input from "../components/Input.jsx";
import TextArea from "../components/TextArea.jsx";
import Button from "../components/Button.jsx";
import SubmitLoader from "../components/SubmitLoader.jsx";
import useAxiosPrivate from "../hooks/useAxiosPrivate.js";
import { urlPatchSchema } from "../schemas/urls.schemas.js";

export default function UpdateUrl() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { urlId } = useParams();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState({});
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!auth) {
      return navigate("/login?reason=denied", {
        state: { from: location },
        replace: true,
      });
    }
  }, [auth]);

  useEffect(() => {
    setIsLoading(true);

    axiosPrivate
      .get(`/urls/${urlId}`)
      .then((res) => {
        const url = res.data;
        setUrl(url);
        setForm({ title: url.title, description: url.description });
      })
      .catch((err) => {
        switch (err.response?.status) {
          case 422:
            toast(
              "Title and description must not exceed 64 and 256 characters respectively and the URL must be valid"
            );
            break;

          case 401:
            navigate("/login?reason=expired", {
              state: { form, from: location },
              replace: true,
            });
            break;

          default:
            console.error(err);
            toast("Unexpected error. Try again.");
            break;
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const { error } = urlPatchSchema.validate(form);

    if (error) {
      toast(error.message);
      setIsLoading(false);
      return;
    }

    try {
      await axiosPrivate.patch(`/urls/${urlId}`, form);
      navigate(`/usr/${auth.username}`, { replace: true });
    } catch (err) {
      switch (err.response?.status) {
        case 422:
          toast(
            "Title and description must not exceed 64 and 256 characters respectively and the URL must be valid"
          );
          break;

        case 401:
          navigate("/login?reason=expired", {
            state: { form, from: location },
            replace: true,
          });
          break;

        default:
          console.error(err);
          toast("Unexpected error. Try again.");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Toast />
      <Container>
        <FormContainer>
          <Form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="title"
              placeholder="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              disabled={isLoading}
            />
            <TextArea
              maxLength={256}
              name="description"
              placeholder="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              disabled={isLoading}
            />
            <Input
              maxLength={2048}
              name="longUrl"
              placeholder="long url"
              value={url.longUrl}
              disabled={true}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <SubmitLoader /> : "Update"}
            </Button>
          </Form>
        </FormContainer>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-inline: auto;
  margin-bottom: 3rem;
  width: 40rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: ${(props) => props.theme.contentBackground};
  filter: drop-shadow(2px 2px 5px ${(props) => props.theme.secondary});
`;
