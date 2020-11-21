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
          console.log(data);
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
    <div>
      <Row>{stats.map((stat) => 
        <Col sm="3" style={{textAlign: 'center'}} key={stat.id}>
        <h5 style={{textTransform: 'uppercase'}}>{stat.title} <Badge color="secondary">{stat.amount}</Badge></h5>
        </Col>
      )}</Row>
    </div>
  );
};

export default Stats;