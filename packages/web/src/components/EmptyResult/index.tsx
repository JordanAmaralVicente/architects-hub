import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { Box } from "@mui/material";

interface EmptyResultProps {
  text: string;
}

export const EmptyResult = (props: EmptyResultProps): JSX.Element => {
  return (
    <Box
      sx={{
        marginTop: "24px",
        backgroundColor: "white",
        display: "flex",

        fontSize: "20px",
        padding: "24px",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.text}
      <SentimentDissatisfiedIcon sx={{ marginLeft: "8px" }} />
    </Box>
  );
};
