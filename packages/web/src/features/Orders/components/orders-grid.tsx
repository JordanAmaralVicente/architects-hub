import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { OrderCard } from "../../../components/OrderCard";
import { OrderService } from "../../../components/OrderModal";
import { useAuth } from "../../../contexts/auth";
import { Order } from "../../../types/order";
import { getOrders } from "../api/get-orders";

export const OrdersGrid = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalEditable, setIsModalEditable] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    getOrders(user.id, user.userRole).then((result) => {
      setOrders(result);
    });
  }, []);

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnSubmitForm = async (title: string, description: string) => {};

  const handleOnClickOpenOrderCard = async (id: string) => {
    const tempOrder = orders.find((value) => value.id === id);

    setSelectedOrder(tempOrder);
    setIsModalEditable(false);
    setIsModalOpen(true);
  };

  return (
    <>
      <Box
        sx={{
          margin: "24px",
        }}
      >
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
          {orders.map((order, idx) => (
            <Grid key={idx} item xs={3}>
              <OrderCard order={order} onClick={handleOnClickOpenOrderCard} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <OrderService
        isOpen={isModalOpen}
        onClose={handleOnCloseModal}
        onClickSubmitForm={handleOnSubmitForm}
        isEditable={isModalEditable}
        order={selectedOrder}
      />
    </>
  );
};
