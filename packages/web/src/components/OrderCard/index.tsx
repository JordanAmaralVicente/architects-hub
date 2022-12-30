import { Box, Paper, styled, Typography } from "@mui/material";
import { Order } from "../../types/order";
import { OrderStatusesMap } from "../../types/order-status";

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
        <Typography>{OrderStatusesMap.get(props.order.status)}</Typography>
      </Box>
    </Item>
  );
};
