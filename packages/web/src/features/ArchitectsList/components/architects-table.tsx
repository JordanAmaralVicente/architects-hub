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
      />
    </Box>
  );
};
