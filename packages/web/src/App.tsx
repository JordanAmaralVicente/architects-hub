import { ReactNode } from "react";
import { AuthProvider } from "./contexts/auth";

interface AppProps {
  children?: ReactNode;
}

function App(props: AppProps) {
  const { children } = props;

  return <AuthProvider>{children}</AuthProvider>;
}

export default App;
