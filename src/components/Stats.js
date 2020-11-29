import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Badge } from "reactstrap";
import { API } from "../api";
import { FaUserGraduate, FaChalkboardTeacher, FaChair } from "react-icons/fa";
import StatsDisplay from "./StatsDisplay";

const Stats = () => {
  const [stats, setStats] = useState([]);
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
        // returnIcons();
        //setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div>
      <Row>
          {stats.map((item) => (
            <Col md="3" className="mb-3" style={{ textAlign: "center" }}  key={item.id}>
            <StatsDisplay data={item} />
            </Col>
          ) )}
       
      </Row>
    </div>
  );
};

export default Stats;
