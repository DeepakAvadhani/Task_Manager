import React, { useEffect, useState } from "react";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { format } from "date-fns";

const List = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, "tasks");
        const tasksSnapshot = await getDocs(tasksCollection);
        const tasksData = tasksSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
        console.log(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Subject</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Deadline</TableCell>
            <TableCell className="tableCell">Created On</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="tableCell">{task.user}</TableCell>
              <TableCell className="tableCell">{task.subject}</TableCell>
              <TableCell className="tableCell">{task.description}</TableCell>
              <TableCell className="tableCell">{task.deadline}</TableCell>
              <TableCell className="tableCell">{task.createdAt}</TableCell>
              <TableCell className="tableCell">
                <span
                  className={`status ${task.completed ? "Completed" : "Pending"}`}
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
