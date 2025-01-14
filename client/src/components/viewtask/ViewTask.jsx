import "./viewtask.scss"
import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";

const ViewTask = () => {
  const { userId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskDocRef = doc(db, "tasks", userId);
        const taskDocSnapshot = await getDoc(taskDocRef);
        if (taskDocSnapshot.exists()) {
          setTask(taskDocSnapshot.data());
        } else {
          setError("Task not found.");
        }
      } catch (error) {
        setError("Error fetching task: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [userId]);

  const handleMarkAsCompleted = async () => {
    try {
      const taskDocRef = doc(db, "tasks", userId);
      await setDoc(taskDocRef, { completed: true }, { merge: true });
      console.log("Task marked as completed!");
      setTask({ ...task, completed: true }); // Update task state locally
    } catch (error) {
      setError("Error marking task as completed: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="task-details">
        <h2>{task.subject}</h2>
        <p>Description: {task.description}</p>
        <p className={task.completed ? "completed" : "deadline"}>
          Deadline: {task.deadline}
        </p>
        {!task.completed && (
          <button onClick={handleMarkAsCompleted}>Mark as Completed</button>
        )}
      </div>
    </div>
  );
};

export default ViewTask;
