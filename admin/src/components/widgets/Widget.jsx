// Widget.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from "../../firebase";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import "./widget.scss";

const Widget = ({ type }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let collectionName;
        switch (type) {
          case "users":
            collectionName = "users";
            break;
          case "tasks":
            collectionName = "tasks";
            break;
          case "completedtasks":
            collectionName = "tasks";
            break;
          default:
            break;
        }

        const collectionRef = collection(db, collectionName);
        let snapshot;

        if (type === "completedtasks") {
          const queryCompletedTasks = query(collectionRef, where("completed", "==", true));
          snapshot = await getDocs(queryCompletedTasks);
        } else {
          snapshot = await getDocs(collectionRef);
        }

        setCount(snapshot.size);
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchData();
  }, [type]);

  let data;
  switch (type) {
    case "users":
      data = {
        title: "Users",
        counter: true,
        link: "See all Users",
        icon: <PersonOutlinedIcon className="icon" style={{ color: "purple" }} />,
      };
      break;
    case "tasks":
      data = {
        title: "Tasks",
        counter: true,
        link: "See all Tasks",
        icon: <AssignmentOutlinedIcon className="icon" style={{ color: "purple" }} />,
      };
      break;
    case "completedtasks":
      data = {
        title: "Completed Tasks",
        counter: true,
        link: "See all Tasks",
        icon: <TaskAltOutlinedIcon className="icon" style={{ color: "purple" }} />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{data.counter && count}</span>
        <Link to={"/users"} style={{ textDecoration: "none" }}>
          <span className="link">{data.link}</span>
        </Link>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
