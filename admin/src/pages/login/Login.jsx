import React, { useContext, useState} from "react";
import "./login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import {Link} from "react-router-dom";
const Login = () => {
  const [error, setError] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext)
  

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type:"LOGIN",payload:user})
       
        navigate("/");
        
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setemail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setpassword(e.target.value)}
        />

        <button type="submit">Login</button>
        {error && <span>Wrong email and password</span>}
      </form>
      <div className="forgot-password">
        <Link to="/forgotpassword">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
