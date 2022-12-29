import { ReactNode } from "react";

interface AppProps {
  children?: ReactNode;
}

function App(props: AppProps) {
  const { children } = props;

  return <>{children}</>;
}

export default App;
