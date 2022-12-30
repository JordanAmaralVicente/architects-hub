import { SnackbarProvider } from "notistack";
import React from "react";

interface AppProps {
  children?: React.ReactNode;
}

function App(props: AppProps) {
  const { children } = props;

  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={2000}
    >
      {children}
    </SnackbarProvider>
  );
}

export default App;
