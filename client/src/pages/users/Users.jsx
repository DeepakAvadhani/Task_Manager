import React from 'react'
import "./users.scss"
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import DataTable from '../../components/dataTable/DataTable'
const Users = () => {
  return (
    <div className='users'>
      <Sidebar/>
      <div className='usercontainer'>
        <Navbar/>
        <DataTable/>
      </div>
    </div>
  )
}

export default Users
