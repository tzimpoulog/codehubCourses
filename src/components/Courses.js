import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { API } from "../api";
import { Row, Col, Container } from "reactstrap";

const Courses = (props) => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch(API + "courses")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong ...");
          }
        })
        .then((data) => {
          console.log(data);
          setCourses(data);
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
      <Container>
        <Row>
          {courses.map((cour) => (
            <Col sm="4" key={cour.id} style={{ marginTop: "20px" }}>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src={cour.imagePath}
                  alt="Card image cap"
                />
                <CardBody>
                  <CardSubtitle tag="h6" className="mb-2 color-text">
                    Price: {cour.title}
                  </CardSubtitle>
                  <CardText className="color-text">Price: {cour.price.normal} €</CardText>
                  <Button  style={{ background:'#F15B41'}}>
                    <Link style={{ textDecoration: "none", color: '#fff' }}
                      to={{pathname: `/courses/${cour.id}`}}>
                      Learn more{" "}
                    </Link>
                  </Button>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Courses;
