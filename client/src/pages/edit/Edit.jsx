import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./edit.scss";

const Edit = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null); // State for upload status

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser.uid;
        const userRef = doc(db, "users", userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.name || "");
          setDesignation(userData.designation || "");
          setDepartment(userData.department || "");
          setEmail(userData.email || "");
          setPhone(userData.phone || "");
          setImageUrl(userData.image || "");
        } else {
          console.log("User data not found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const imageFile = e.target.files[0];
      setFile(imageFile);

      // Set preview image URL
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = (event) => {
        setImageUrl(event.target.result);
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedImageUrl = imageUrl; // Initialize a temporary variable

      // Upload image file to storage if a new image is selected
      if (file) {
        try {
          const storageRef = ref(getStorage(), `profile_images/${auth.currentUser.uid}`);
          await uploadBytes(storageRef, file);
      
          const imageUrl = await getDownloadURL(storageRef);
          updatedImageUrl = imageUrl;
          setUploadStatus("success"); // Set upload status to success
        } catch (error) {
          console.error("Error uploading image:", error);
          setUploadStatus("error"); // Set upload status to error
        }
      }

      // Update user data in Firestore
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        name,
        designation,
        department,
        email,
        phone,
        image: updatedImageUrl, // Use the updatedImageUrl here
      });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="edit">
      <Sidebar />
      <div className="editcontainer">
        <Navbar />
        <div className="top">
          <h1>Edit User Information</h1>
          <div className="bottom">
            <div className="left">
              <img
                src={imageUrl || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                alt="No Profile"
              />
              <input
                type="file"
                id="file"
                onChange={handleImageChange}
              />
            </div>
            <div className="right">
              <form onSubmit={handleSubmit}>
                <div className="fromInput">
                  <label htmlFor="file">Image:</label>
                  <input type="file" id="file" />
                </div>
                <div className="fromInput">
                  <label>Name</label>
                  <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="fromInput">
                  <label>Designation</label>
                  <input type="text" placeholder="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} required />
                </div>
                <div className="fromInput">
                  <label>Department</label>
                  <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} required />
                </div>
                <div className="fromInput">
                  <label>Email</label>
                  <input type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="fromInput">
                  <label>Phone Number</label>
                  <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <button type="submit">Update User</button>
                {uploadStatus === "success" && <div className="successMessage">Profile updated successfully!</div>}
                {uploadStatus === "error" && <div className="errorMessage">Error updating profile. Please try again later.</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
