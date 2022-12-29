import { createBrowserRouter } from "react-router-dom";
import { ArchitectsListPage } from "../features/ArchitectsList";
import { LoginPage } from "../features/Auth/Login";
import { RegisterPage } from "../features/Auth/Register";

import { HomePage } from "../features/Home";
import { OrdersPage } from "../features/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cadastro",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/lista-arquitetos",
    element: <ArchitectsListPage />,
  },
  {
    path: "/lista-servicos",
    element: <OrdersPage />,
  },
]);
