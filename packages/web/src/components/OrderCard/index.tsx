import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Paper, styled, Tooltip, Typography } from "@mui/material";
import { useAuth } from "../../contexts/auth";
import { Order } from "../../types/order";
import { OrderStatus, OrderStatusesMap } from "../../types/order-status";
import { UserRole } from "../../types/user-role";

const Item = styled(Paper)(({ theme }) => ({
  position: "relative",
  backgroundColor: "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "192px",

  display: "flex",
  flexDirection: "column",

  "&: hover": {
    cursor: "pointer",
  },
}));

interface OrderCardProps {
  order: Order;
  onClickContent?: (id: string) => void;
  onClickEdit?: (id: string) => void;
  onClickDelete?: (id: string) => void;
  onClickAccept?: (id: string) => void;
  onClickReject?: (id: string) => void;
}

const statusColor = new Map<
  OrderStatus,
  { backgroundColor: string; color: string }
>([
  [OrderStatus.ACCEPTED, { backgroundColor: "#adffb1", color: "#388e3c" }],
  [OrderStatus.REFUSED, { backgroundColor: "#f5a2a2", color: "#d32f2f" }],
  [OrderStatus.SOLICITED, { backgroundColor: "#edd4a6", color: "#e09a02" }],
]);

export const OrderCard = (props: OrderCardProps): JSX.Element => {
  const { user } = useAuth();

  return (
    <Item>
      <Box
        onClick={() => {
          if (props.onClickContent) props.onClickContent(props.order.id);
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "18px",
            margin: "8px",
          }}
        >
          {props.order.title}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            margin: "8px",
            maxHeight: "64px",
            overflowY: "hidden",
            borderRadius: "6px",
          }}
        >
          {props.order.description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          position: "absolute",
          bottom: "8px",
          width: "100%",
          maxWidth: "240px",
        }}
      >
        <span
          style={{
            ...statusColor.get(props.order.status),
            borderRadius: "3px",
            padding: "6px",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          {OrderStatusesMap.get(props.order.status)}
        </span>
        <Box>
          {user.userRole === UserRole.ARCHITECT &&
            props.order.status === OrderStatus.SOLICITED && (
              <>
                <Tooltip title="Aceitar" sx={{ marginRight: "8px" }}>
                  <DoneIcon
                    color="success"
                    onClick={() => {
                      if (props.onClickAccept)
                        props.onClickAccept(props.order.id);
                    }}
                  />
                </Tooltip>
                <Tooltip title="Recusar">
                  <DoDisturbOnIcon
                    color="error"
                    onClick={() => {
                      if (props.onClickReject)
                        props.onClickReject(props.order.id);
                    }}
                  />
                </Tooltip>
              </>
            )}
          {user.userRole === UserRole.ARCHITECT &&
            props.order.status !== OrderStatus.SOLICITED && (
              <Typography sx={{ fontSize: "12px", opacity: 0.7 }}>
                Respondido
              </Typography>
            )}
          {user.userRole === UserRole.CLIENT && (
            <>
              {props.order.status !== OrderStatus.REFUSED && (
                <Tooltip title="Editar" sx={{ marginRight: "8px" }}>
                  <EditIcon
                    onClick={() => {
                      if (props.onClickEdit) props.onClickEdit(props.order.id);
                    }}
                  />
                </Tooltip>
              )}
              <Tooltip title="Deletar">
                <DeleteIcon
                  color="error"
                  onClick={() => {
                    if (props.onClickDelete)
                      props.onClickDelete(props.order.id);
                  }}
                />
              </Tooltip>
            </>
          )}
        </Box>
      </Box>
    </Item>
  );
};
