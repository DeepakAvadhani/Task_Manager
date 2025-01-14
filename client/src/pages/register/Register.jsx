import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './register.scss';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../../firebase"; 
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState('');
  const [designation, setDesignation] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const [error, setError] = useState(''); 
  // const [task, settask] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
     
      alert(`New User created: ${user.email}`);
      navigate("/login");
  
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        designation: designation,
        department: department,
        email: email,
        phoneNumber:phoneNumber,
        timeStamp: serverTimestamp(),
      });
    } catch (error) {
      setError(error.message);
      setMessage("Error creating user. Please try again.");
    }

  };

  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      {message && <p className="success-message">{message}</p>} {/* Display success message if exists */}
      {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="designation">Designation</label>
          <input
            type="text"
            id="designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to the login page */}
    </div>
  );
};

export default Register;
