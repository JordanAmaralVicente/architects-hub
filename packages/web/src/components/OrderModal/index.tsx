import { LoadingButton } from "@mui/lab";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../types/order";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

interface OrderServiceProps {
  isEditable?: boolean;
  isEditing?: boolean;
  isOpen: boolean;
  onClose: () => void;
  onClickSubmitForm?: (title: string, description: string) => void;
  order?: Order;
}

export const OrderService = (props: OrderServiceProps): JSX.Element => {
  const { isEditable = true, isEditing = false } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setTitle(props?.order?.title);
    setDescription(props?.order?.description);
  }, [props.order]);

  return (
    <>
      <Modal open={props.isOpen} onClose={props.onClose}>
        <Box sx={{ ...style, outline: "none" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <Typography sx={{ margin: "6px" }} variant="h5">
              Solicitação de serviço
            </Typography>
            <TextField
              sx={{ margin: "6px" }}
              placeholder="Título do Serviço"
              disabled={!isEditable}
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <TextField
              sx={{ margin: "6px" }}
              placeholder="Descrição do Serviço"
              disabled={!isEditable}
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {!!isEditable && (
              <LoadingButton
                variant="contained"
                sx={{ margin: "6px" }}
                onClick={() => {
                  if (props.onClickSubmitForm)
                    props.onClickSubmitForm(title, description);
                }}
              >
                {isEditing ? "Atualizar" : "Solicitar"}
              </LoadingButton>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};
