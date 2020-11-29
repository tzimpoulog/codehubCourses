import React from "react";
import { Row, Col } from "reactstrap";
import { Badge } from "reactstrap";
import { API } from "../api";
import { FaUserGraduate, FaChalkboardTeacher, FaCalendarAlt, FaUserTie } from "react-icons/fa";

export default function StatsDisplay(data) {

  const returnIcon = (title) => {
    switch (title) {
      case "students":
        return <FaUserGraduate style={{fontSize: '30px', color: '#fff'}} />;
        break;

      case "courses":
        return <FaChalkboardTeacher style={{fontSize: '30px', color: '#fff'}} />;
        break;

      case "instructors":
        return <FaUserTie style={{fontSize: '30px', color: '#fff'}}/>;
        break;

      default:
        return <FaCalendarAlt style={{fontSize: '30px', color: '#fff'}} />;
        break;
    }
  };

  return (
    <div style={{ background: '#F15B41', padding: '10px', borderRadius: '10px'}}>         
          {returnIcon(data.data.title)}
          <h5 style={{ textTransform: "uppercase", color: '#fff' }}>
            {data.data.title}{" "}
            <Badge style={{ background: "#fff", color: '#F15B41' }} pill>
              {data.data.amount}
            </Badge>
          </h5>
    </div>
  );
}
