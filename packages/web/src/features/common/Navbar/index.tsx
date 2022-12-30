import { useNavigate } from "react-router-dom";
import { Navbar } from "../../../components";
import { useAuth } from "../../../contexts/auth";

export const MountedNavbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar
      linkButtons={[
        {
          label: "Lista de Arquitetos",
          link: "/lista-arquitetos",
        },
        {
          label: "Lista de Serviços",
          link: "/lista-servicos",
        },
      ]}
      startButton={{
        label: "Home Page",
        onClick() {
          navigate("/");
        },
      }}
      endButton={{
        label: "Sair",
        onClick() {
          logout();
          navigate("/");
        },
      }}
    />
  );
};
