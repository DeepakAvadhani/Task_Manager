import React, { useState, useEffect } from "react";
import "./newtask.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { doc, addDoc, collection, serverTimestamp,onSnapshot } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import { useParams } from "react-router-dom";

const NewTask = () => {
  const [taskSubject, setTaskSubject] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [userName, setUserName] = useState("");
  const [file, setFile] = useState(null);
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userDocRef = doc(db, "users", userId);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        setUserData(userData);
        setUserName(userData.name || "User");
      } else {
        console.log("User not found");
      }
    });

    return () => unsubscribe();
  }, [userId]);

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskSubject || !taskDescription) {
      console.error("Invalid data. Please fill in all required fields.");
      return;
    }

    try {
      let fileURL = "";
      if (file) {
        const fileRef = ref(storage, `files/${file.name}`);
        await uploadBytes(fileRef, file);
        fileURL = await getDownloadURL(fileRef);
      }

      const taskRef = collection(db, "tasks");
      await addDoc(taskRef, {
        user: userName,
        subject: taskSubject,
        description: taskDescription,
        deadline: deadline.toISOString(),
        fileURL: fileURL,
        userid: userId,
        completed: false,
        createdAt: serverTimestamp(),
      });

      alert("Task assigned successfully.");
      setTaskSubject("");
      setTaskDescription("");
      setDeadline(new Date());
      setFile(null);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="newtask">
      <Sidebar />
      <div className="newtaskcontainer">
        <Navbar />
        <div className="assign-task-form">
          <h3>Assign Task to {userName || "User"}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="taskSubject">Task Subject:</label>
              <input
                type="text"
                id="taskSubject"
                value={taskSubject}
                onChange={(e) => setTaskSubject(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="taskDescription">Task Description:</label>
              <textarea
                id="taskDescription"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline:</label>
              <DatePicker
                id="deadline"
                selected={deadline}
                onChange={(date) => setDeadline(date)}
                dateFormat="dd-MM-yyyy"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="file">File Upload :</label>
              <input
                type="file"
                id="file"
                onChange={handleFileUpload}
                accept=".pdf,.doc,.docx,.txt"
              />
            </div>
            <button type="submit">Assign Task</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewTask;
