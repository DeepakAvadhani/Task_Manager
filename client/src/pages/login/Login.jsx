import React, { useContext,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./login.scss";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)


  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type:"LOGIN",payload:user})
        console.log(user)
        navigate("/");
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
        {error && <span>Wrong email and password</span>}
      </form>
      <div className="signup-link">
        <p>Don't have an account?</p>
        <Link to="/Register">Sign Up</Link>
      </div>
      <div className="forgot-password">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>

    </div>
  );
};

export default Login;
