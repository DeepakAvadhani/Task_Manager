import React,{ useEffect, useState } from "react";
import "./table.scss";
import Table from "@mui/material/Table"
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
  const [userData, setUserData] = useState([]);
  const rows = [
    {
      id: 1,
      name: "Akshay",
      designation: "Professor",
      department: "CSA",
      email: "askshay@gmail.com",
      task: "do something useful",
      status: "Completed",
    },
    {
      id: 2,
      name: "Aravind",
      designation: "Asst.Professor",
      department: "CSA",
      email: "aravind@gmail.com",
      task: "do something useful",
      status: "Pending",
    },
    {
      id: 3,
      name: "Anant",
      designation: "Associate Professor",
      department: "CSA",
      email: "anant@gmail.com",
      task: "do something useful",
      status: "Completed",
    },
    {
        id: 4,
        name: "Anish",
        designation: "Asst.Professor",
        department: "CSA",
        email: "anish@gmail.com",
        task: "do something useful",
        status: "Incomplete",
      },
  ];
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));

      const data = [];
      querySnapshot.forEach((doc) => {
        const taskData = doc.data();
        const deadlineDate = new Date(taskData.deadline);
        taskData.deadline = format(deadlineDate, "dd-MM-yyyy");
        data.push(taskData);

      });

      setUserData(data);
      console.log(data)
    };

    fetchData();
  }, []);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">User</TableCell>
            <TableCell className="tableCell">Task</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Deadline</TableCell>
            
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="tableCell">{user.user}</TableCell>
              <TableCell className="tableCell">{user.subject}</TableCell>
              <TableCell className="tableCell">{user.description}</TableCell>
              <TableCell className="tableCell">{user.deadline}</TableCell>
             
              <TableCell className="tableCell">
                <span
                  className={`status ${user.completed ? "Completed" : "Pending"}`}
                >
                  {user.completed ? "Completed" : "Pending"}
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
