import { Assignment } from "@mui/icons-material/";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { EmptyResult } from "../../../components/EmptyResult";
import { OrderService } from "../../../components/OrderModal";
import { Table } from "../../../components/Table";
import { useAuth } from "../../../contexts/auth";
import { User } from "../../../types/user";
import { UserRole } from "../../../types/user-role";
import { createServiceOrder } from "../api/create-order";
import { getArchitects } from "../api/get-architects";

export const ArchitectsTable = (): JSX.Element => {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [architects, setArchitecs] = useState<Partial<User>[]>([]);
  const [selectedArchitect, setSelectedArchitect] =
    useState<Partial<User>>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    getArchitects().then((result) => {
      setArchitecs(result);
      setIsInitialized(true);
    });
  }, []);

  const handleOnClickAskOrder = (rowId: string) => {
    const architect = architects.find((value) => value.id === rowId);
    setSelectedArchitect(architect);
    setIsModalOpen(true);
  };

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArchitect(null);
  };

  const handleOnSubmitForm = async (title: string, description: string) => {
    setIsLoading(true);
    try {
      await createServiceOrder({
        clientId: user.id,
        architectId: selectedArchitect.id,
        title,
        description,
      });
      enqueueSnackbar("Solicitação enviada com sucesso", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Não foi possível enviar a solicitação", {
        variant: "error",
      });
    }

    setIsLoading(false);
    setIsModalOpen(false);
  };

  const actionsList = [
    {
      actionNode: <Assignment />,
      onClick: handleOnClickAskOrder,
      tooltip: "Realizar uma solicitação de serviço a esse arquiteto",
    },
  ];

  return (
    <>
      <Box
        sx={{
          margin: "24px",
        }}
      >
        <Table
          rows={architects}
          columns={[
            {
              label: "Nome",
              attr: "name",
            },
            {
              label: "E-mail",
              attr: "email",
            },
            {
              label: "Telefone",
              attr: "telephone",
            },
            {
              label: "Idade",
              attr: "age",
            },
          ]}
          actions={user.userRole === UserRole.CLIENT ? actionsList : []}
        />
        {isInitialized && !architects.length && (
          <EmptyResult text="Não foram encontrados arquitetos" />
        )}
      </Box>
      <OrderService
        isOpen={isModalOpen}
        isLoading={isLoading}
        onClose={handleOnCloseModal}
        onClickSubmitForm={handleOnSubmitForm}
      />
    </>
  );
};
