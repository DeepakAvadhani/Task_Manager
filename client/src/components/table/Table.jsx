import React, { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { getDocs, query, collection, where, doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; 

const List = () => {
  const [uid, setUserId] = useState(null);
  const [userData, setUserData] = useState([]);
  const fileInputRef = useRef(null); // Ref for file input

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          setUserId(currentUser.uid);
        } else {
          console.log("No user is currently signed in.");
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const q = query(collection(db, "tasks"), where("userid", "==", uid));
        const querySnapshot = await getDocs(q);

        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setUserData(data);
      }
    };
    fetchData();
  }, [uid]);

  if (!auth.currentUser) {
    return <Navigate to="/login" />;
  }

  const markAsCompleted = async (taskId) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, { completed: true });
      const updatedData = userData.map((item) =>
        item.id === taskId ? { ...item, completed: true } : item
      );
      setUserData(updatedData);
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  const handleViewDocument = (fileURL) => {
    window.open(fileURL); // Open the document in a new tab
  };

  const handleUploadDocument = async (taskId) => {
    // Trigger click event on hidden file input
    fileInputRef.current.click();
  };

  const handleFileChange = async (taskId, event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const storageRef = ref(storage, `files/${file.name}`);
        await uploadBytes(storageRef, file);
        const fileURL = await getDownloadURL(storageRef);

        const taskRef = doc(db, "tasks", taskId);
        await updateDoc(taskRef, { fileURL });

        const updatedData = userData.map((item) =>
          item.id === taskId ? { ...item, fileURL } : item
        );
        setUserData(updatedData);
      } catch (error) {
        console.error("Error uploading document:", error);
      }
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
            <TableCell className="tableCell">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="tableCell">{item.subject}</TableCell>
              <TableCell className="tableCell">{item.description}</TableCell>
              <TableCell className="tableCell">{item.deadline}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${item.completed ? "Completed" : "Pending"}`}>
                  {item.completed ? "Completed" : "Pending"}
                </span>
              </TableCell>
              <TableCell className="tableCell">
                {item.completed ? (
                  <span>Task Completed</span>
                ) : (
                  <div>
                    <Button onClick={() => markAsCompleted(item.id)} variant="contained" color="primary" sx={{ fontSize:"10px" }}>
                      Mark as Completed
                    </Button>
                    <Button onClick={() => handleViewDocument(item.fileURL)} variant="contained" color="primary" sx={{ fontSize:"10px" }}>
                      View Doc
                    </Button>
                    <Button onClick={() => handleUploadDocument(item.id)} variant="contained" color="secondary" sx={{ fontSize:"10px" }}>
                      Upload Doc
                    </Button>
                    {/* Hidden file input */}
                    <input
                      type="file"
                      accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={(event) => handleFileChange(item.id, event)}
                    />
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
