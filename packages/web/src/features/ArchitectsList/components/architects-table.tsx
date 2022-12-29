import { Assignment } from "@mui/icons-material/";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Table } from "../../../components/Table";
import { User } from "../../../types/user";
import { getArchitects } from "../api/get-architects";

export const ArchitectsTable = (): JSX.Element => {
  const [architects, setArchitecs] = useState<Partial<User>[]>([]);

  useEffect(() => {
    getArchitects().then((result) => {
      setArchitecs(result);
    });
  }, []);

  const handleOnClickAskOrder = (rowId: string) => {
    const architect = architects.find((value) => value.id === rowId);

    console.log(architect);
  };

  return (
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
  );
};
