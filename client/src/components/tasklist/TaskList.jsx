import React,{useState,useEffect} from "react";
import "./tasklist.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../databasesource";
import { Link } from "react-router-dom";
import { collection, getDocs, onSnapshot,doc } from "firebase/firestore";
import { db } from "../../firebase";
const TaskList = () => {
  //const [data] = useState(userRows);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
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
  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to="users/viewtask"
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton" >View</div>
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

export default TaskList;
