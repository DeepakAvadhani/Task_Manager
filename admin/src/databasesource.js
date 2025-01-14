import "./components/dataTable/datatable.scss";

export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "User Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellwithimg">
          <img className="cellimg" src={params.row.img} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  { field: "designation", headerName: "Designation", width: 200 },
  { field: "department", headerName: "Department", width: 200 },
  { field: "email", headerName: "Email", width: 250 },
  
];
export const userRows = [
  {
    id: 1,
    name: "Anant",
    img: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w300/2023/10/free-images.jpg",
    designation: "Professor",
    department: "CSA",
    email: "anant@gmail.com",
  },
  {
    id: 2,
    username: "Aravind",
    img: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w300/2023/10/free-images.jpg",
    designation: "Senior Professor",
    department: "CSA",
    email: "aravind@gmail.com",
  },
  {
    id: 3,
    username: "Amit",
    img: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w300/2023/10/free-images.jpg",
    designation: "Asst. Professor",
    department: "CSA",
    email: "amit@gmail.com",
  },
  {
    id: 4,
    username: "Abhishek",
    img: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w300/2023/10/free-images.jpg",
    designation: "Associate Professor",
    department: "CSA",
    email: "abhi@gmail.com",
  },
  {
    id: 5,
    username: "Kumar",
    img: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w300/2023/10/free-images.jpg",
    designation: "Lecturer",
    department: "CSA",
    email: "kumar@gmail.com",
  },
];
