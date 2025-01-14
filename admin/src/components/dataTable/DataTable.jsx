import React from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../databasesource";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot,doc,deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
const DataTable = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        console.log(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(data);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        const handleDeleteUser = async (userId) => {
          try {
            const userRef = doc(db, "users", userId);
            await deleteDoc(userRef); // Assuming you have import { deleteDoc } from "firebase/firestore";
            // Optionally, you can update the data in the state after deletion
            const updatedData = data.filter((item) => item.id !== userId);
            setData(updatedData);
            console.log("User deleted successfully");
          } catch (error) {
            console.error("Error deleting user:", error);
          }
        };
  
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}/single`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
            <Link
              to={`/users/${params.row?.id}/newtask`}
              style={{ textDecoration: "none" }}
            >
              <div className="taskButton">Assign Task</div>
            </Link>
            <div className="deleteButton" onClick={() => handleDeleteUser(params.row.id)}>
              Delete User
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      <DataGrid
        rows={data}
        columns={userColumns.concat(actionColumn)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
