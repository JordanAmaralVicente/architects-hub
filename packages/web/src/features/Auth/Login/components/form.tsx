import LoadingButton from "@mui/lab/LoadingButton";
import { Box, FormControl, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../apis/login";
import { LoginDTO } from "../types";

const OuterFormContainer = styled(Box)(() => ({
  backgroundColor: "white",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "6px",
  margin: "8px",
  width: "100%",
  maxWidth: "500px",
}));

const CustomTextField = styled(TextField)(() => ({
  margin: "6px",
}));

export const Form = (): JSX.Element => {
  const { register, handleSubmit } = useForm<LoginDTO>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginDTO) => {
    setIsLoading(true);

    try {
      await login(data);
    } catch (error) {
      alert("something went wrong, please try it againg later");
    }

    setIsLoading(false);
  };

  return (
    <OuterFormContainer>
      <Typography
        sx={{
          padding: "8px 0",
          margin: "6px",
        }}
        variant="h4"
      >
        Login
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "8px 0",
        }}
      >
        <FormControl>
          <CustomTextField {...register("email")} placeholder="E-mail" />
        </FormControl>
        <FormControl>
          <CustomTextField
            {...register("password")}
            placeholder="Password"
            type="password"
          />
        </FormControl>
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          sx={{ margin: "6px" }}
        >
          Entrar
        </LoadingButton>
      </form>
    </OuterFormContainer>
  );
};
