import { Typography } from "@mui/material";
import { MountedNavbar } from "../common";
import { OrdersGrid } from "./components/orders-grid";

export function OrdersPage(): JSX.Element {
  return (
    <>
      <MountedNavbar />
      <Typography variant="h4" sx={{ margin: "24px" }}>
        Lista de Serviços Solicitados
      </Typography>
      <OrdersGrid />
    </>
  );
}
