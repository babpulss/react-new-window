import { createBrowserRouter } from "react-router-dom";
import MainScreen from "./MainScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainScreen />,
  },
]);
