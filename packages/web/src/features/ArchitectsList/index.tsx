import { Box, styled, Typography } from "@mui/material";
import { MountedNavbar } from "../common";
import { ArchitectsTable } from "./components/architects-table";

export const OuterPageContainer = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}));

export function ArchitectsListPage(): JSX.Element {
  return (
    <Box>
      <MountedNavbar />
      <Typography variant="h4" sx={{ margin: "24px" }}>
        Lista de Arquitetos disponíveis
      </Typography>
      <ArchitectsTable />
    </Box>
  );
}
