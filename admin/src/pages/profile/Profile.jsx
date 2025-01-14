import React, { useState, useEffect } from "react";
import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userRef = doc(db, "admins", userId);
          const docSnap = await getDoc(userRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("User data not found in Firestore.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="user-profile">
      <Sidebar />
      <div className="profilecontainer">
        <Navbar />
        {userData && (
          <div className="profile-header">
            <img
              src={userData.image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="profile-image"
            />
            
            <div className="profile-details">
              <h2>{userData.name}</h2>
              <p>Email: {userData.email}</p>
              <p>Designation: {userData.designation}</p>
              <p>Department: {userData.department}</p>
              <p>Phone Number: {userData.phoneNumber}</p>
              
            </div>
          </div>

        )}
        {!userData && <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Profile;
