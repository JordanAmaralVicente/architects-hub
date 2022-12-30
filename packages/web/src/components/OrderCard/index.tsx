import { Paper, styled, Typography } from "@mui/material";
import { OrderStatus } from "../../types/order-status";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
}));

interface OrderCardProps {
  status: OrderStatus;
  title: string;
  description: string;
}

export const OrderCard = (props: OrderCardProps): JSX.Element => {
  return (
    <Item>
      <Typography>{props.title}</Typography>
      <Typography>{props.description}</Typography>
      <Typography>{props.status}</Typography>
    </Item>
  );
};
