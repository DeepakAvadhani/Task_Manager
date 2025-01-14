import React, { useState, useEffect } from "react";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useParams } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import UserTable from "../../components/usertable/UserTable";
const Single = () => {
  const { userId } = useParams();
  const [userName, setUserName] = useState("");
  const [userData, setUserData] = useState(null);
  const [designation, setDesignation] = useState(null);
  const [department, setDepartment] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
          setUserName(userDocSnapshot.data().name || "User");
          setEmail(userDocSnapshot.data().email);
          setDesignation(userDocSnapshot.data().designation);
          setDepartment(userDocSnapshot.data().department);
          setPhone(userDocSnapshot.data().phone);
          console.log("User data:", userDocSnapshot.data().name);
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);
  console.log(userId);
  return (
    <div className="single">
      <Sidebar />
      <div className="singlecontainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">User Information</h1>
            <div className="item">
              <img
                src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w300/2023/10/free-images.jpg"
                alt="/"
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{userName}</h1>
                <div className="detailItem">
                  <span className="itemkey">Designation: </span>
                  <span className="itemValue">{designation}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Department: </span>
                  <span className="itemValue">{department}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Email: </span>
                  <span className="itemValue">{email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemkey">Phone: </span>
                  <span className="itemValue">{phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
        <div className="below">
          <div className="tablecontainer">
            <UserTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
