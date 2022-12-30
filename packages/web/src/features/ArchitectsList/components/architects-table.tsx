import { Assignment } from "@mui/icons-material/";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { OrderService } from "../../../components/OrderModal";
import { Table } from "../../../components/Table";
import { useAuth } from "../../../contexts/auth";
import { User } from "../../../types/user";
import { createServiceOrder } from "../api/create-order";
import { getArchitects } from "../api/get-architects";

export const ArchitectsTable = (): JSX.Element => {
  const { user } = useAuth();

  const [architects, setArchitecs] = useState<Partial<User>[]>([]);
  const [selectedArchitect, setSelectedArchitect] =
    useState<Partial<User>>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getArchitects().then((result) => {
      setArchitecs(result);
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
    await createServiceOrder({
      clientId: user.id,
      architectId: selectedArchitect.id,
      title,
      description,
    });
  };

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
          actions={[
            {
              actionNode: <Assignment />,
              onClick: handleOnClickAskOrder,
              tooltip: "Realizar uma solicitação de serviço a esse arquiteto",
            },
          ]}
        />
      </Box>
      <OrderService
        isOpen={isModalOpen}
        onClose={handleOnCloseModal}
        onClickSubmitForm={handleOnSubmitForm}
      />
    </>
  );
};
