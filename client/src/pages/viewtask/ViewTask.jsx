import React from "react";
import { useParams } from "react-router-dom";

const ViewTask = () => {
  const { userId } = useParams();
  // State and useEffect are removed in this simplified version
console.log(userId)
  return (
    <div>
      <div className="task-details">
        {/* Placeholder content for task details */}
        <h2>Task Subject</h2>
        <p>Description: Lorem ipsum dolor sit amet.</p>
        <p className="deadline">Deadline: 2024-05-05</p>
        <button>Mark as Completed</button>
      </div>
    </div>
  );
};

export default ViewTask;
