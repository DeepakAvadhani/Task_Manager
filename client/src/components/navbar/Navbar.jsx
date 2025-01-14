import "./navbar.scss";
import React, { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const currentUser = auth.currentUser;
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [userImageUrl, setUserImageUrl] = useState("");

  useEffect(() => {
    const fetchUserImageUrl = async () => {
      try {
        if (currentUser) {
          const userId = currentUser.uid;
          const userRef = doc(db, "users", userId);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUserImageUrl(userData.image || "");
          } else {
            console.log("User data not found in Firestore.");
          }
        }
      } catch (error) {
        console.error("Error fetching user image:", error);
      }
    };

    fetchUserImageUrl();
  }, [currentUser]); // Make sure to include currentUser in dependencies array
  const handleFullscreenExit = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
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
          <div className="item" onClick={handleFullscreenExit}>
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src={userImageUrl || "https://yourdefaultimageurl.com/default.jpg"}
              alt="User Avatar"
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
