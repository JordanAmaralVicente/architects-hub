import { Box, Paper, styled, Typography } from "@mui/material";
import { Order } from "../../types/order";
import { OrderStatus, OrderStatusesMap } from "../../types/order-status";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  height: "192px",

  "&: hover": {
    cursor: "pointer",
  },
}));

interface OrderCardProps {
  order: Order;
  onClick?: (id: string) => void;
}

const statusColor = new Map<
  OrderStatus,
  { backgroundColor: string; color: string }
>([
  [OrderStatus.ACCEPTED, { backgroundColor: "#adffb1", color: "#388e3c" }],
  [OrderStatus.REFUSED, { backgroundColor: "#f5a2a2", color: "#d32f2f" }],
  [OrderStatus.SOLICITED, { backgroundColor: "#97daf7", color: "#0288d1" }],
]);

export const OrderCard = (props: OrderCardProps): JSX.Element => {
  return (
    <Item
      onClick={() => {
        if (props.onClick) props.onClick(props.order.id);
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
      <Box>
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
      </Box>
    </Item>
  );
};
