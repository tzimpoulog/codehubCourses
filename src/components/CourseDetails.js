import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";
import { Button } from "reactstrap";
import JumbotronContent from "./JumbotronContent";
import { Container, Row, Col } from "reactstrap";

function CourseDetails() {
  const [course, setCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const courseId = useParams();

  function sayHello() {
    alert('Hello!');
  }

  const deleteCourse = () => {
    fetch(API + "courses/" + courseId.id,{
        method: 'DELETE',
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        console.log('Course deleted!!!');
      })
      .catch((error) => {
        console.log(error);
      });
  };


  useEffect(() => {
    const fetchData = () => {
      fetch(API + "courses/" + courseId.id)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong ...");
          }
        })
        .then((data) => {
          setCourse(data);
          const fetchInstructors = () => {
            fetch(API + "instructors/")
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error("Something went wrong ...");
                }
              })
              .then((data) => {
                console.log(data);
                setInstructor(data);
              })
              .catch((error) => {
                console.log(error);
              });
          };

          fetchInstructors();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchData();
  }, []);
  return (
    course && (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Container>
          <Row>
            <Col>
              <img src={course.imagePath} />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <h1 className="color-text">{course.title}</h1>
              <div
                dangerouslySetInnerHTML={{ __html: course.description }}
              ></div>
              <div className="color-text">Duration: {course.duration}</div>
              <div className="color-text">
                Dates: {course.dates?.start_date} to {course.dates?.end_date}
              </div>
              <div className="color-text">
                Early bird: {course.price?.early_bird} €
              </div>
              <div className="color-text">Normal: {course.price?.normal} €</div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button onClick={deleteCourse} style={{ background: "#F15B41" }}>Delete</Button>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
}

export default CourseDetails;
