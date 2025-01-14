import "./forgotpassword.scss"
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async(e) => {
    e.preventDefault();
    try {
        await sendPasswordResetEmail(auth, email);
        setIsEmailSent(true);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      {isEmailSent ? (
        <Typography variant="body1" gutterBottom>
          An email has been sent to {email}. Follow the instructions in the email
          to reset your password.
        </Typography>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <TextField
            type="email"
            label="Email"
            variant="outlined"
            value={email}
            onChange={handleEmailChange}
            margin="normal"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary">
            Reset Password
          </Button>
        </form>
      )}
      <Typography variant="body2" mt={2}>
        <Link to="/login">Back to Login</Link>
      </Typography>
    </Box>
  );
};

export default ForgotPassword;