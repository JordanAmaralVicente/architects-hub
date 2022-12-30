import { Box, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { EmptyResult } from "../../../components/EmptyResult";
import { OrderCard } from "../../../components/OrderCard";
import { OrderService } from "../../../components/OrderModal";
import { useAuth } from "../../../contexts/auth";
import { Order } from "../../../types/order";
import { OrderStatus } from "../../../types/order-status";
import { User } from "../../../types/user";
import { deleteOrder } from "../api/delete-order";
import { getOrders } from "../api/get-orders";
import { updateOrder } from "../api/update-order";

export const OrdersGrid = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalEditable, setIsModalEditable] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();
  const snackbar = useSnackbar();

  const fetchOrders = async (user: User) => {
    const result = await getOrders(user.id, user.userRole);
    setOrders(result);
    setIsInitialized(true);
  };

  useEffect(() => {
    fetchOrders(user);
  }, [user]);

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
    fetchOrders(user);
  };

  const handleOnClickOpenOrderCard = async (id: string) => {
    const tempOrder = orders.find((value) => value.id === id);

    setSelectedOrder(tempOrder);
    setIsModalEditable(false);
    setIsModalOpen(true);
  };

  const handleOnClickAccept = async (id: string) => {
    try {
      await updateOrder(id, { status: OrderStatus.ACCEPTED });
      snackbar.enqueueSnackbar("Solicitação aceita com sucesso!", {
        variant: "success",
      });
    } catch (error) {
      snackbar.enqueueSnackbar("Não foi possível completar a ação!", {
        variant: "error",
      });
    }
    fetchOrders(user);
  };

  const handleOnClickReject = async (id: string) => {
    try {
      await updateOrder(id, { status: OrderStatus.REFUSED });
      snackbar.enqueueSnackbar("Solicitação recusada com sucesso!", {
        variant: "success",
      });
    } catch (error) {
      snackbar.enqueueSnackbar("Não foi possível completar a ação!", {
        variant: "error",
      });
    }
    fetchOrders(user);
  };

  const handleOnClickEdit = async (id: string) => {
    const tempOrder = orders.find((value) => value.id === id);

    setSelectedOrder(tempOrder);
    setIsModalEditable(true);
    setIsModalOpen(true);
  };

  const handleOnClickDelete = async (id: string) => {
    try {
      await deleteOrder(id);
      snackbar.enqueueSnackbar("Solicitação excluída com sucesso!", {
        variant: "success",
      });
    } catch (error) {
      snackbar.enqueueSnackbar("Não foi possível completar a ação!", {
        variant: "error",
      });
    }
    fetchOrders(user);
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
        {isInitialized && !orders.length && (
          <EmptyResult text="Não foram encontradas solicitações" />
        )}
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
