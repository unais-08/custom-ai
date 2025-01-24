import ReactDOM from "react-dom/client";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import {
  HomePage,
  SignInPage,
  SignUpPage,
  ChatPage,
  DashboardPage,
  ErrorPage,
} from "./screens";
import { DashboardLayout, RootLayout } from "./layouts";
import "./index.css";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        element: <DashboardLayout />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },
          {
            path: "/dashboard/chats",
            children: [
              {
                index: true,
                element: <Navigate to="new" replace />,
              },
              {
                path: "new",
                element: <ChatPage />,
              },
              {
                path: ":chatId",
                element: <ChatPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/*",
        element: <ErrorPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
