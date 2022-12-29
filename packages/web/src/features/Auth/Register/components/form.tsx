import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
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
import { Gender, Genders } from "../../../../types/gender";
import { UserRole, UserRoles } from "../../../../types/user-role";
import { registerUser } from "../apis/create-user";
import { CreateUserDTO } from "../types";

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
  const { register, handleSubmit, setValue, getValues } =
    useForm<CreateUserDTO>();

  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CLIENT);

  const onSubmit = async (data: CreateUserDTO) => {
    setIsLoading(true);
    const { age, ...rest } = data;
    try {
      await registerUser({ ...rest, age: Number(age), userRole });
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
        <Grid sx={{ margin: "6px", width: "100%" }}>
          <FormControl>
            <TextField {...register("age")} type="number" placeholder="Idade" />
          </FormControl>
          <FormControl sx={{ width: "50%", marginLeft: "2px" }}>
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
        </Grid>
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
      </form>
    </OuterFormContainer>
  );
};
