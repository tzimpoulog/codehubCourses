import React,{ useEffect, useState} from "react";
import { Row, Col } from "reactstrap";
import { Badge } from 'reactstrap';
import {API} from '../api';
import { FaUserGraduate, FaChalkboardTeacher,FaChair } from "react-icons/fa";


const Stats = () => {
  const [stats, setStats] = useState([]);
  const [ic, setIcon] = useState([]);
  let icon = null;

  const fetchData = () => {
    fetch(API + "stats")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        setStats(data);
        returnIcons();
        //setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    fetchData();
  }, []);

const returnIcons = () => {
  stats.forEach((stat) =>{
    switch (stat.title) {
      case 'students':
        icon = <FaUserGraduate />;
        break;
  
      case 'courses':
        icon = <FaChalkboardTeacher />;
        break;
  
      case 'instructors':
        icon = <FaChalkboardTeacher />;
        break;
  
      default:
        icon = <FaChair />;
        break;
    }
    console.log(icon);
  })
}

  return (
    <div >
      <Row >{stats.map((stat) => 
        <Col md="3" style={{textAlign: 'center'}} key={stat.id}> 
         {icon}
        <h5 style={{textTransform: 'uppercase'}}>{stat.title} <Badge style={{background:'#F15B41'}} pill>{stat.amount}</Badge></h5>
        </Col>
      )}</Row>
    </div>
  );
};

export default Stats;
