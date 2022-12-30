import { Box, Button, styled, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)(() => ({
  background:
    "linear-gradient(45deg, rgba(0,153,205,1) 0%, rgba(0,9,107,1) 75%)",
  color: "white",
  fontWeight: "bold",
  marginTop: "12px",
  padding: "8px",
}));

export const MainMessage = () => {
  const standardTheme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "white",
        maxWidth: "400px",
        padding: "24px",
        margin: "64px",
        borderRadius: "8px",

        [standardTheme.breakpoints.down("sm")]: {
          margin: "32px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "24px",
        }}
      >
        Seja bem vindo!
      </Typography>
      <Typography
        sx={{
          fontSize: "18px",
          marginTop: "24px",
        }}
      >
        Aqui, é possível conectar os melhores dos arquitetos ao melhores
        clientes.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "24px",
        }}
      >
        <CustomButton onClick={() => navigate("/login")}>Entrar</CustomButton>
        <CustomButton onClick={() => navigate("/cadastro")}>
          Registrar-se
        </CustomButton>
      </Box>
    </Box>
  );
};
