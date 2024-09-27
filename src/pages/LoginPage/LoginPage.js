import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, TextField, Button, IconButton, Typography, Box, Grid, Alert } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const loginSchema = yup.object({
  email: yup.string().email('Email không hợp lệ!').required('Email là bắt buộc!'),
  password: yup.string().required('Mật khẩu là bắt buộc!')
});

function LoginPage() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    const from = location.state?.from?.pathname || "/";
    let { email, password } = data;

    try {
      await auth.login({ email, password }, () => {
        navigate(from, { replace: true });
      });
    } catch (error) {
      reset();
      setError("responseError", { message: error.message || "Login failed" });
      console.log(error);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      await auth.loginWithGoogle({ credentialResponse }, () => {
        navigate('/');
      });
    } catch (error) {
      console.log("Google Login Failed: ", error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Google Login Error: ", error);
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <Container maxWidth="xs" > 
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          mt: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Ui Farm
        </Typography>

        {errors.responseError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {errors.responseError.message}
          </Alert>
        )}

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <Box sx={{ position: "relative", width: '100%' }}>
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            sx={{ position: "absolute", top: "50%", right: "10px", transform: "translateY(-50%)" }}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Box>

        <Grid container spacing={1} sx={{ mt: 2, width: '100%' }}> 
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className="btn log-in"
            >
              Đăng Nhập
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleRegister}
              className="btn register"
            >
              Đăng Kí
            </Button>
          </Grid>
        </Grid>

        {/* <Box sx={{ mt: 2, textAlign: 'center', width: '100%' }}>
          <Button href="#" variant="text" className="forget-password">
            Quên mật khẩu?
          </Button>
        </Box> */}

        <Box sx={{ mt: 2, textAlign: 'center', width: '100%' }}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
