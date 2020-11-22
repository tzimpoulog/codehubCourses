import React,{ useEffect, useState} from "react";
import { Row, Col } from "reactstrap";
import { Badge } from 'reactstrap';
import {API} from '../api';

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
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
          //setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);

  return (
    <div >
      <Row >{stats.map((stat) => 
        <Col md="3" style={{textAlign: 'center'}} key={stat.id}>
        <h5 style={{textTransform: 'uppercase'}}>{stat.title} <Badge style={{background:'#F15B41'}} pill>{stat.amount}</Badge></h5>
        </Col>
      )}</Row>
    </div>
  );
};

export default Stats;
