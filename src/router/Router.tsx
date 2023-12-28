import { createBrowserRouter } from "react-router-dom";
import { MainPage } from "@/pages";
import App from "@/app/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
