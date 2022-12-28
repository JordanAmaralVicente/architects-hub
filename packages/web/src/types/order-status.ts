export enum OrderStatus {
  ACCEPTED = "A",
  REFUSED = "R",
  SOLICITED = "S",
}

export const OrderStatuses = [
  {
    value: OrderStatus.ACCEPTED,
    label: "Aceito",
  },
  {
    value: OrderStatus.REFUSED,
    label: "Recusado",
  },
  {
    value: OrderStatus.SOLICITED,
    label: "Solicitado",
  },
];
