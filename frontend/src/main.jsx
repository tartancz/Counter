import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { action } from "./routes/auth/signup/signup";
import Root from "./routes/root/root";
import Signup, { action as signupAction, loader as signupLoader } from "./routes/auth/signup/signup";
import Login, {
  action as loginAction,
  loader as loginLoader,
} from "./routes/auth/login/login";
import Email from "./routes/auth/email/email";
import Logout, { loader as logoutLoader } from "./routes/auth/logout/logout";
import { loader as emailConfLoader } from "./routes/auth/email/emailConfirm";
import ErrorPage from "./routes/errorPage/errorPage";
import CounterHub, {
  Myloader as myCounterHubLoader,
  foreignLoader as foreignCounterHubLoader,
} from "./components/counterHub/counterHub";
import { loader as rootLoader } from "./components/sidebar/sidebar";

const router = createBrowserRouter([
  {
    element: <Root />,
    path: "/",
    loader: rootLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <CounterHub edit={true} />,
            loader: myCounterHubLoader,
          },
          {
            path: "user/:user",
            element: <CounterHub edit={false} />,
            loader: foreignCounterHubLoader,
          },
          //auth
          {
            path: "login/",
            element: <Login />,
            action: loginAction,
            loader: loginLoader,
          },
          {
            path: "signup/",
            element: <Signup />,
            action: signupAction,
            loader: signupLoader,
          },
          { path: "email/", element: <Email /> },
          { path: "email/:key", loader: emailConfLoader },
          { path: "logout", element: <Logout />, loader: logoutLoader },
          { path: "profile", element: <h1>Beatifull profile</h1> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
