import React, { useState, useEffect } from "react";
import "./addadmin.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, auth, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
const AddAdmin = () => {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState({});
  const storageRef = ref(storage, file.name);
  const navigate = useNavigate();
  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;
      console.log(name);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
  const handleCreation = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user)
      // Additional actions after user creation if needed
      setMessage(`New admin created: ${user.email}`);

      // Add admin details to Firestore
      await setDoc(doc(db, "admins", user.uid), {
        name: name,
        designation: designation,
        department: department,
        email: email,
        image: data.img,
        timeStamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (error) {
      setError(error.message);
      setMessage("Error creating admin. Please try again.");
    }
  };

  return (
    <div className="addadmin">
      <Sidebar />
      <div className="newcontainer">
        <Navbar />
        <div className="top">
          <h1>Add New Admin</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt="No Profile"
            />
          </div>
          <div className="right">
            <form onSubmit={handleCreation}>
              <div className="fromInput">
                <label htmlFor="file">
                  Image: <UploadFileOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className="fromInput">
                <label>Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="fromInput">
                <label>Designation</label>
                <input
                  type="text"
                  placeholder="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                />
              </div>
              <div className="fromInput">
                <label>Department</label>
                <input
                  type="text"
                  placeholder="Department"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>
              <div className="fromInput">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="fromInput">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <div className="error">{error}</div>}
              {message && <div className="success">{message}</div>}
              <button type="submit">Create Admin</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdmin;
