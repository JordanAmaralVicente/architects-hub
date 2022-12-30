import { Box, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { OrderCard } from "../../../components/OrderCard";
import { OrderService } from "../../../components/OrderModal";
import { useAuth } from "../../../contexts/auth";
import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/order-status";
import { deleteOrder } from "../api/delete-order";
import { getOrders } from "../api/get-orders";
import { updateOrder } from "../api/update-order";

export const OrdersGrid = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalEditable, setIsModalEditable] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const snackbar = useSnackbar();

  async function fetchOrders() {
    const result = await getOrders(user.id, user.userRole);
    setOrders(result);
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnSubmitForm = async (title: string, description: string) => {
    setIsLoading(true);
    try {
      await updateOrder(selectedOrder.id, { title, description });
      snackbar.enqueueSnackbar("Informações atualizadas com sucesso!", {
        variant: "success",
      });
    } catch (error) {
      snackbar.enqueueSnackbar("Houve um erro ao atualizar as informações", {
        variant: "error",
      });
    }
    setIsLoading(false);
    setIsModalOpen(false);
    fetchOrders();
  };

  const handleOnClickOpenOrderCard = async (id: string) => {
    const tempOrder = orders.find((value) => value.id === id);

    setSelectedOrder(tempOrder);
    setIsModalEditable(false);
    setIsModalOpen(true);
  };

  const handleOnClickAccept = async (id: string) => {
    await updateOrder(id, { status: OrderStatus.ACCEPTED });
    fetchOrders();
  };

  const handleOnClickReject = async (id: string) => {
    await updateOrder(id, { status: OrderStatus.REFUSED });
    fetchOrders();
  };

  const handleOnClickEdit = async (id: string) => {
    const tempOrder = orders.find((value) => value.id === id);

    setSelectedOrder(tempOrder);
    setIsModalEditable(true);
    setIsModalOpen(true);
  };

  const handleOnClickDelete = async (id: string) => {
    await deleteOrder(id);
    fetchOrders();
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
              <OrderCard
                order={order}
                onClickContent={handleOnClickOpenOrderCard}
                onClickAccept={handleOnClickAccept}
                onClickReject={handleOnClickReject}
                onClickEdit={handleOnClickEdit}
                onClickDelete={handleOnClickDelete}
              />
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
        isLoading={isLoading}
        isEditing
      />
    </>
  );
};
