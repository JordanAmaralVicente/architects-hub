import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth";

interface GuestProps {
  children: ReactNode;
}

export const Guest = (props: GuestProps): JSX.Element => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/lista-servicos" />;
  }

  return <>{props.children}</>;
};
