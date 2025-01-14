import React, { useState, useEffect } from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
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
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
         
         
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div className="item">
              {userData && userData.image ? (
                <img
                  src={userData.image}
                  alt=""
                  className="avatar"
                />
              ) : (
                <div>No Image</div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
