import React, { useEffect, useState } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import "./widget.scss";
import { Link } from "react-router-dom";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db, auth } from "../../firebase"; // Assuming you have auth imported for getting the current user

const Widget = ({ type }) => {
  const [tasksCount, setTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  useEffect(() => {
    const fetchTaskCounts = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const tasksCollection = collection(db, "tasks");
          const userTasksQuery = query(tasksCollection, where("userid", "==", currentUser.uid));
          const userTasksSnapshot = await getDocs(userTasksQuery);
          const userTasksCount = userTasksSnapshot.size;

          setTasksCount(userTasksCount);

          // Count completed tasks
          const completedTasksQuery = query(userTasksQuery, where("completed", "==", true));
          const completedTasksSnapshot = await getDocs(completedTasksQuery);
          const completedTasksCount = completedTasksSnapshot.size;

          setCompletedTasksCount(completedTasksCount);
        }
      } catch (error) {
        console.error("Error fetching task counts:", error);
      }
    };

    fetchTaskCounts();
  }, []);

  let data;
  switch (type) {
    case "user":
      data = {
        title: "Users",
        counter: false,
        link: "See all Users",
        icon: <PersonOutlinedIcon className="icon" style={{ color: "purple" }} />,
      };
      break;
    case "tasks":
      data = {
        title: "Tasks",
        counter: true,
        count: tasksCount,
        link: "See all Tasks",
        icon: <AssignmentOutlinedIcon className="icon" style={{ color: "purple" }} />,
      };
      break;
    case "completedtasks":
      data = {
        title: "Completed Tasks",
        counter: true,
        count: completedTasksCount,
        link: "See all Completed Tasks",
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
        {data.counter && (
          <span className="counter">
            {data.count}
          </span>
        )}
        <Link to="/users" className="link">
          {data.link}
        </Link>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
