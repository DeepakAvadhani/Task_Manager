import "./components/dataTable/datatable.scss";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "subject", headerName: "Task", width: 200 },
  { field: "deadline", headerName: "Deadline", width: 200 },
  { field: "description", headerName: "Description", width: 250 },
  
];
export const userRows = [
  {
    id: 1,
    task: "Do something useful",
    deadline: "23-05-2025",
    assignedby: "Director",
  },
  {
    id: 2,
    task: "Do something useful",
    deadline: "23-05-2025",
    assignedby: "Chancellor",
  },
  {
    id: 3,
    task: "Do something useful",
    deadline: "23-05-2025",
    assignedby: "Chancellor",
  },
  {
    id: 4,
    task: "Do something useful",
    deadline: "23-05-2025",
    assignedby: "Chancellor",
  },
  {
    id: 5,
    task:"Do something useful",
    deadline: "23-05-2025",
    assignedby: "Chancellor",
  },
];
