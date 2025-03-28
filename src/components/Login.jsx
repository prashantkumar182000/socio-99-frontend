import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      dispatch(loginSuccess(userCredential.user));
      navigate('/');
    } catch (err) {
      dispatch(loginFailure(err.message));
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    dispatch(loginStart());
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      dispatch(loginSuccess(userCredential.user));
      navigate('/');
    } catch (err) {
      dispatch(loginFailure(err.message));
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <LockIcon sx={{ fontSize: 60, color: 'white' }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: 'white' }}>
                Welcome Back!
              </Typography>
              <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Login to continue your journey.
              </Typography>
            </Box>

            {error && (
              <Typography color="error" sx={{ mb: 2, textAlign: 'center', color: '#ff6b6b' }}>
                {error}
              </Typography>
            )}

            <form onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
                sx={{ mb: 2, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                sx={{ mb: 3, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 2 }}
                InputProps={{ style: { color: 'white' } }}
                InputLabelProps={{ style: { color: 'rgba(255, 255, 255, 0.7)' } }}
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8e53 100%)',
                    color: 'white',
                    fontWeight: 700,
                  }}
                >
                  Login
                </Button>
              </motion.div>
            </form>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mb: 2 }}>
                Or login with
              </Typography>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon sx={{ color: 'white' }} />}
                  onClick={handleGoogleLogin}
                  sx={{
                    py: 1.5,
                    borderRadius: 2,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    fontWeight: 700,
                  }}
                >
                  Google
                </Button>
              </motion.div>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: '#ff6b6b', fontWeight: 600 }}>
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;