import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import relativeTime from "dayjs/plugin/relativeTime.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import Root from "./routes/Root.jsx";
import theme from "./styles/theme.js";
import RootIndex from "./routes/RootIndex.jsx";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import SignUp, { action as signUpAction } from "./routes/SignUp.jsx";
import Login, { action as loginAction } from "./routes/Login.jsx";
import UserUrls from "./routes/UserUrls.jsx";
import ErrorPage from "./routes/ErrorPage.jsx";
import Logout from "./routes/Logout.jsx";
import NewUrl from "./routes/NewUrl.jsx";
import UpdateUrl from "./routes/UpdateUrl.jsx";
import DeleteUrl from "./routes/DeleteUrl.jsx";

dayjs.extend(utc);
dayjs.extend(relativeTime);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <RootIndex /> },
      { path: "/signup", element: <SignUp />, action: signUpAction },
      { path: "/login", element: <Login />, action: loginAction },
      { path: "/logout", element: <Logout /> },
      { path: "/usr/:username", element: <UserUrls /> },
      { path: "/new", element: <NewUrl /> },
      { path: "/urls/:urlId/edit", element: <UpdateUrl /> },
      { path: "/urls/:urlId/delete", element: <DeleteUrl /> },
    ],
  },
]);

export default function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
