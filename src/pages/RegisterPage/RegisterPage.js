import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, TextField, Button, IconButton, Typography, Box, Grid, Alert } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const RegisterSchema = yup.object().shape({
  name: yup.string().required("Name là bắt buộc!"),
  email: yup.string().email("Email không hợp lệ!").required("Email là bắt buộc!"),
  phone: yup.string().required("Số điện thoại là bắt buộc!"),
  password: yup.string().required("Mật khẩu là bắt buộc!"),
  confirmPassword: yup
    .string()
    .required("Vui lòng xác nhận mật khẩu!")
    .oneOf([yup.ref("password")], "Mật khẩu phải khớp!"),
});

const defaultValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    const { name, email, phone, password } = data;

    try {
      await auth.register({ name, email, phone, password }, () => {
        navigate("/", { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", { message: error.message || "Đăng ký không thành công" });
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: { xs: 4, sm: 6 },
        mb: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4 },
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: 3,
          padding: { xs: 3, sm: 4 },
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          gutterBottom
          fontFamily={'Playwrite CU'}
          onClick={() => navigate('/')}
          sx={{
            cursor: 'pointer',
            fontSize: { xs: '1.8rem', sm: '2.4rem' },
            mb: { xs: 2, sm: 3 },
          }}
        >
          Ui Farm
        </Typography>

        {errors.responseError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {errors.responseError.message}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Họ và Tên"
          variant="outlined"
          margin="normal"
          {...register("name")}
          error={!!errors.name}
          helperText={errors.name?.message}
          sx={{
            '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
            '& .MuiInputBase-input': { fontSize: { xs: '0.9rem', sm: '1rem' } },
          }}
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
            '& .MuiInputBase-input': { fontSize: { xs: '0.9rem', sm: '1rem' } },
          }}
        />

        <TextField
          fullWidth
          label="Số Điện Thoại"
          variant="outlined"
          margin="normal"
          {...register("phone")}
          error={!!errors.phone}
          helperText={errors.phone?.message}
          sx={{
            '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
            '& .MuiInputBase-input': { fontSize: { xs: '0.9rem', sm: '1rem' } },
          }}
        />

        <Box sx={{ position: "relative", width: '100%' }}>
          <TextField
            fullWidth
            label="Mật Khẩu"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={{
              '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
              '& .MuiInputBase-input': { fontSize: { xs: '0.9rem', sm: '1rem' } },
            }}
          />
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            sx={{
              position: "absolute",
              top: "50%",
              right: { xs: "8px", sm: "12px" },
              transform: "translateY(-50%)",
            }}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Box>

        <Box sx={{ position: "relative", width: '100%' }}>
          <TextField
            fullWidth
            label="Xác Nhận Mật Khẩu"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={{
              '& .MuiInputLabel-root': { fontSize: { xs: '0.9rem', sm: '1rem' } },
              '& .MuiInputBase-input': { fontSize: { xs: '0.9rem', sm: '1rem' } },
            }}
          />
          <IconButton
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            sx={{
              position: "absolute",
              top: "50%",
              right: { xs: "8px", sm: "12px" },
              transform: "translateY(-50%)",
            }}
          >
            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2, width: '100%' }}>
          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={isSubmitting}
              className="btn register"
              sx={{
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Đăng Ký
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
              className="btn log-in"
              sx={{
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Đăng Nhập
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default RegisterPage;
