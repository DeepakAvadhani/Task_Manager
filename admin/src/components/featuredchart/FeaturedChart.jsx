import React from "react";
import "./featuredchart.scss";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
const FeaturedChart = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Tasks</h1>
        <MoreVertOutlinedIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={10} text="10%" strokeWidth={5}/>
        </div>
        <p className="title">Total tasks done today</p>
        <p className="t">Total tasks done today</p>
        <p className="desc">Total tasks done today</p>
        <div className="summary">
          <div className="item">
            <div className="itemtitle">Target</div>
              <div className="itemresult">10%</div>
          </div>
          <div className="item">
            <div className="itemtitle">Target</div>
              <div className="itemresult">10%</div>
          </div>
          <div className="item">
            <div className="itemtitle">Target</div>
              <div className="itemresult">10%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedChart;
