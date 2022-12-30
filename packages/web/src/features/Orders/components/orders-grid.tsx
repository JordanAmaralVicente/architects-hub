import { Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { OrderService } from "../../../components/OrderModal";
import { useAuth } from "../../../contexts/auth";

export const ArchitectsTable = (): JSX.Element => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  useEffect(() => {}, []);

  const handleOnCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOnSubmitForm = async (title: string, description: string) => {};

  return (
    <>
      <Box
        sx={{
          margin: "24px",
        }}
      >
        <Grid></Grid>
      </Box>
      <OrderService
        isOpen={isModalOpen}
        onClose={handleOnCloseModal}
        onClickSubmitForm={handleOnSubmitForm}
      />
    </>
  );
};
