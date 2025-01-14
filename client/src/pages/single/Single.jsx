import React, { useState, useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {useParams} from "react-router-dom"
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./single.scss";

const Single = () => {
  const [userData, setUserData] = useState(null);
  const [maximized, setMaximized] = useState(false); // State to track if image is maximized
  const { userId } = useParams();
  console.log(userId)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, "users", currentUser.uid); // Assuming users collection and document IDs match user IDs
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            setUserData(userDocSnap.data());
           
          } else {
            console.log("User data not found.");
          }
        } else {
          console.log("No user is currently signed in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleImageClick = () => {
    setMaximized(!maximized); // Toggle maximized state
  };

  return (
    <div className="single">
      <Sidebar />
      <div className="singlecontainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">User Information</h1>
            {userData && (
              <div className="item">
                <img
                  src={userData.image || "https://example.com/default.jpg"} // Replace "https://example.com/default.jpg" with your default image URL
                  alt="User"
                  className={maximized ? "itemImg maximized" : "itemImg"} // Apply different classes based on maximized state
                  onClick={handleImageClick} // Add onClick event to the image
                />
                <div className="details">
                  <h1 className="itemTitle">{userData.name}</h1>
                  <div className="detailItem">
                    <span className="itemkey">Designation: </span>
                    <span className="itemValue">{userData.designation}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemkey">Department: </span>
                    <span className="itemValue">{userData.department}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemkey">Email: </span>
                    <span className="itemValue">{userData.email}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemkey">Phone: </span>
                    <span className="itemValue">{userData.phone}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="right">
            {/* Add any additional content for the right section */}
          </div>
        </div>
        <div className="bottom">
          <div className="listContainer">
            <div className="task-details">
              {/* Placeholder content for task details */}
              <h2>Task Subject</h2>
              <p>Description: Lorem ipsum dolor sit amet.</p>
              <p className="deadline">Deadline: 2024-05-05</p>
              <button>Mark as Completed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
