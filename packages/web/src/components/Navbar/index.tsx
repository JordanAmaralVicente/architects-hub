import { Box, Button, styled } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const OuterContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  background: "linear-gradient(90deg, #0059B2, #007FFF 120%)",
  color: "white",
  height: "56px",
  alignItems: "center",
  justifyContent: "space-between",
  display: "flex",

  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    justifyContent: "center",
  },
}));

const CustomNavbarButton = styled(Button)(({ theme }) => ({
  color: "white",
  fontWeight: "bold",
  margin: "0 8px",

  "&:hover": {
    backgroundColor: "white",
    color: "#0059B2",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    justifyContent: "center",
    margin: 0,
    lineHeight: "14px",
  },
}));

interface LinkProps {
  link: string;
  label: string;
}

interface NavbarProps {
  children?: ReactNode;
  linkButtons?: LinkProps[];
  startButton?: {
    label?: string;
    onClick: () => void;
  };
  endButton?: {
    label: string;
    onClick: () => void;
  };
}

export const Navbar = (props: NavbarProps): JSX.Element => {
  const navigate = useNavigate();

  return (
    <OuterContainer>
      {!!props.startButton && (
        <CustomNavbarButton onClick={props.startButton.onClick}>
          {props.startButton.label}
        </CustomNavbarButton>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {props?.linkButtons?.map((item, idx) => {
          return (
            <CustomNavbarButton key={idx} onClick={() => navigate(item.link)}>
              {item.label}
            </CustomNavbarButton>
          );
        })}
      </Box>
      {!!props.endButton && (
        <CustomNavbarButton onClick={props.endButton.onClick}>
          {props.endButton.label}
        </CustomNavbarButton>
      )}
    </OuterContainer>
  );
};
