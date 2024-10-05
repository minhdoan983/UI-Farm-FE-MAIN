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
    <Container 
      maxWidth="sm" 
      sx={{ 
        mt: { xs: 4, sm: 6 }, 
        mb: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 4 },
        width:{sm:'400px'}
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
            mb: { xs: 2, sm: 3 }
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

        <Box sx={{ position: "relative", width: '100%' }}>
          <TextField
            fullWidth
            label="Mật khẩu"
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
              transform: "translateY(-50%)" 
            }}
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2, width: '100%' }}> 
          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              className="btn log-in"
              sx={{ 
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Đăng Nhập
            </Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleRegister}
              className="btn register"
              sx={{ 
                py: { xs: 1, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' }
              }}
            >
              Đăng Kí
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, textAlign: 'center', width: '100%' }}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            size="medium"
          />
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;
