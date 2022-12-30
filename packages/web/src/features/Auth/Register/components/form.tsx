import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Gender, Genders } from "../../../../types/gender";
import { UserRole, UserRoles } from "../../../../types/user-role";
import { registerUser } from "../apis/create-user";
import { CreateUserDTO, createUserValidation } from "../types";

const OuterFormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "6px",
  margin: "8px",
  width: "100%",
  maxWidth: "500px",

  [theme.breakpoints.down("sm")]: {
    width: "80%",
    maxWidth: "unset",
  },
}));

const CustomTextField = styled(TextField)(() => ({
  margin: "6px",
}));

export const Form = (): JSX.Element => {
  const { register, handleSubmit, setValue, getValues } =
    useForm<CreateUserDTO>();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CLIENT);
  const navigate = useNavigate();

  const onSubmit = async (data: CreateUserDTO) => {
    setIsLoading(true);
    setErrorMessage(null);

    const { age, ...rest } = data;

    const parsedData: CreateUserDTO = {
      age: Number(age),
      userRole,
      ...rest,
    };

    try {
      await createUserValidation.validateAsync(parsedData);
      await registerUser(parsedData);
      navigate("/login");
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(
          "Algum problema aconteceu com o servidor. Tente mais tarde"
        );
      } else if (error.request) {
        setErrorMessage("Não foi possível se conectar ao servidor");
      } else {
        setErrorMessage(error);
      }
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
        Registre-se
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
          <CustomTextField {...register("name")} placeholder="Nome" />
        </FormControl>
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
        <FormControl>
          <CustomTextField {...register("telephone")} placeholder="Telephone" />
        </FormControl>
        <FormGroup>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <FormControl sx={{ width: "40%" }}>
              <TextField
                {...register("age")}
                type="number"
                placeholder="Idade"
              />
            </FormControl>
            <FormControl sx={{ marginLeft: "3px", width: "56%" }}>
              <Select
                {...register("gender")}
                value={getValues("gender")}
                onChange={(e) => setValue("gender", e.target.value as Gender)}
                placeholder="Gênero"
              >
                {Genders.map((gender, idx) => {
                  return (
                    <MenuItem key={idx} value={gender.value}>
                      {gender.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </FormGroup>

        <FormControl>
          <RadioGroup
            value={userRole}
            {...register("userRole")}
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
            onChange={(e) => {
              setUserRole(e.target.value as UserRole);
            }}
          >
            {UserRoles.map((role, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  value={role.value}
                  control={<Radio />}
                  label={role.label}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          sx={{ margin: "6px" }}
        >
          Cadastrar
        </LoadingButton>
        {!!errorMessage && (
          <Typography sx={{ color: "red", margin: "6px", fontWeight: "bold" }}>
            {errorMessage.toString()}
          </Typography>
        )}
      </form>
    </OuterFormContainer>
  );
};
