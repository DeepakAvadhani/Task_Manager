import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "../../components/table/Table";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [maximized, setMaximized] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userRef = doc(db, "users", userId);
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

  const handleEditProfile = () => {
    navigate("/edit");
  };

  const handleImageClick = () => {
    setMaximized(!maximized);
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singlecontainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={handleEditProfile}>Edit</div>
            <h1 className="title">User Information</h1>
            <div className="item">
              <img
                src={userData?.image || "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w300/2023/10/free-images.jpg"}
                alt="/"
                className={maximized ? "itemImg maximized" : "itemImg"} // Apply different classes based on maximized state
                onClick={handleImageClick} // Add onClick event to the image
              />
              <div className="details">
                <h1 className="itemTitle">{userData?.name || "Jane Doe"}</h1>
                <div className="detailItem">
                  <span className="itemkey">Designation: </span>
                  <span className="itemValue">{userData?.designation || "Professor"}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Department: </span>
                  <span className="itemValue">{userData?.department || "CSA"}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Email: </span>
                  <span className="itemValue">{userData?.email || "janedoe@gmail.com"}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Phone: </span>
                  <span className="itemValue">{userData?.phone || "7874673898"}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
        <div className="bottom">
          <div className="listContainer">
            <div className="listTitle">Latest Tasks</div>
            <Table />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
