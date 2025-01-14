import React, { useState, useEffect } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../databasesource"; // Assuming userColumns contains column definitions
import { collection, getDocs, where, query } from "firebase/firestore";
import { auth, db } from "../../firebase";
import {Link} from 'react-router-dom'
const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const q = query(collection(db, "tasks"), where("userid", "==", currentUser.uid));
          const querySnapshot = await getDocs(q);

          const userData = [];
          querySnapshot.forEach((doc) => {
            userData.push({ id: doc.id, ...doc.data() });
          });
          setData(userData);
        } else {
          console.log("No user is currently signed in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <DataGrid
        rows={data}
        columns={userColumns.concat(actionColumn)} // Assuming userColumns is an array of column definitions
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
};

export default DataTable;
