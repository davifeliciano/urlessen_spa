import styled from "styled-components";
import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

const ToastContainer = styled(ReactToastContainer)`
  --toastify-color-progress-light: ${(props) => props.theme.main};
  font-size: 1.6rem;
`;
