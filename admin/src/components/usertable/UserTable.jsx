import React, { useState, useEffect } from "react";
import "./usertable.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import { storage } from "../../firebase"
import { ref, uploadBytes, getDownloadURL } from "@firebase/storage";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,addDoc,serverTimestamp
} from "firebase/firestore";
import { db } from "../../firebase";

const List = () => {
  const { userId } = useParams();
  const formattedDate = format(new Date(), 'dd/MM/yyyy');
  const [userData, setUserData] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "tasks"), where("userid", "==", userId));
      const querySnapshot = await getDocs(q);

      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      setUserData(data);
    };

    fetchData();
  }, [userId]);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      setUserData(userData.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleChangeDocument = async (e) => {
    const file = e.target.files[0];
    const taskId = e.target.getAttribute('data-taskid');
  
    try {
      let fileURL = "";
      if (file) {
        const fileRef = ref(storage, `files/${file.name}`);
        await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(fileRef);
      }
  
      // Update Firestore document with the new file URL
      await updateDoc(doc(db, "tasks", taskId), { fileURL });
      setUploadStatus("success");
    } catch (error) {
      console.error("Error updating document:", error);
      setUploadStatus("failed");
    }
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Task</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Deadline</TableCell>
            <TableCell className="tableCell">Status</TableCell>
            <TableCell className="tableCell">Actions</TableCell>{" "}
            {/* Add Actions column */}
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="tableCell">{user.subject}</TableCell>
              <TableCell className="tableCell">{user.description}</TableCell>
              <TableCell className="tableCell">{format(new Date(user.deadline), 'dd-MM-yyyy')}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${user.completed ? "Completed" : "Pending"}`}>
                  {user.completed ? "Completed" : "Pending"}
                </span>
              </TableCell>
              <TableCell className="tableCell">
                {!user.completed && user.fileURL && (
                  <input
                    type="file"
                    id={`fileInput-${user.id}`}
                    data-taskid={user.id}
                    onChange={handleChangeDocument}
                    accept=".pdf,.doc,.docx,.txt"
                  />
                )}
                {user.completed &&
                  user.fileURL && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        try {
                          window.open(user.fileURL, "_blank");
                        } catch (error) {
                          console.error("Error opening document:", error);
                        }
                      }}
                      sx={{ fontSize: "10px" }}
                    >
                      View Document
                    </Button>
                  )}
                {user.completed && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteTask(user.id)}
                    sx={{ margin: "5px", fontSize: "10px" }}
                  >
                    Delete
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {uploadStatus && (
        <div className={uploadStatus === "success" ? "success" : "error"}>
          {uploadStatus === "success" ? "Upload successful!" : "Upload failed!"}
        </div>
      )}
    </TableContainer>
  );
};

export default List;
