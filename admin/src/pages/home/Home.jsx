import React from 'react'
import './home.scss'
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Widget from "../../components/widgets/Widget"
import FeaturedChart from '../../components/featuredchart/FeaturedChart'
import Table from '../../components/table/Table'
import HomeTable from '../../components/table/Table'
const Home = () => {
  return (
    <div className='home'>
      <Sidebar/>
      <div className='homeContainer'><Navbar/>
      <div className="widgets">
        <Widget type="users"/>
        <Widget type="tasks"/>
        <Widget type="completedtasks"/>
      </div>
      <div className="charts">
       
        
        <chart/>
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Tasks</div>
      <HomeTable/>
      </div>
      </div>
    </div>
  )
}

export default Home
