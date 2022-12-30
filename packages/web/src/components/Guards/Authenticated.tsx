import { ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/auth";
import { LoginPage } from "../../features/Auth/Login";

interface AuthenticatedProps {
  children: ReactNode;
}

export const Autheticated = (props: AuthenticatedProps): JSX.Element => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isAuthenticated) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }

    return <LoginPage />;
  }

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{props.children}</>;
};
