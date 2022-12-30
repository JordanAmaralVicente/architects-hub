import { MountedNavbar } from "../common";
import { OrdersGrid } from "./components/orders-grid";

export function OrdersPage(): JSX.Element {
  return (
    <>
      <MountedNavbar />
      <OrdersGrid />
    </>
  );
}
