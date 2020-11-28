import React, { useState, useEffect } from "react";
import { API } from "../api";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Row, Col, Container } from "reactstrap";
import { useInput } from "./hooks/useInput";
import { useHistory, useParams } from "react-router-dom";

const EditCourse = () => {
  const courseId = useParams();
  let history = useHistory();
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [duration, setDuration] = useState("");
  const [open, setOpen] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [description, setDescription] = useState("");
  const [priceNormal, setPriceNormal] = useState("");
  const [priceEarlyBird, setPriceEarlyBird] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const [checkBookable, setBookable] = useState({
    open: false,
  });

  const handleToggle = ({ target }) =>
    setBookable((s) => ({ ...s, [target.name]: !s[target.name] }));

  useEffect(() => {
    const fetchInstructors = () => {
      fetch(API + "instructors")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong ...");
          }
        })
        .then((data) => {
          setOptions(data);
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchInstructors();
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = () => {
    fetch(API + "courses/" + courseId.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong ...");
        }
      })
      .then((data) => {
        console.log(data)
        setTitle(data.title);
        setDuration(data.duration);
        setImagePath(data.imagePath);
        setDescription(data.description);
        setPriceNormal(data.price?.normal);
        setPriceEarlyBird(data.price.early_bird);
        setDateStart(data.dates.start_date);
        setDateEnd(data.dates.end_date);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postCourse = (e) => {
    e.preventDefault();
    fetch(API + "courses/" + courseId.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: courseId.id,
        title: title,
        duration: duration,
        imagePath: imagePath,
        description: description,
        price: {
          normal: priceNormal,
          early_bird: priceEarlyBird,
        },
        dates: {
          start_date: dateStart,
          end_date: dateEnd,
        },
        open: checkBookable,
        instructors: instructors,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        history.push("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onCheckedChanged = (e) => {
    const value = e.target.value;
    if (instructors.includes(value)) {
      setInstructors(
        instructors.filter((instructors) => instructors !== value)
      );
    } else {
      setInstructors([...instructors, value]);
    }

    console.log(instructors);
  };

  return (
    <Container>
      <Form onSubmit={(e) => postCourse(e)}>
        <FormGroup>
          <Label htmlFor="title">Title:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="duration">Duration:</Label>
          <Input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imagePath">Image Path:</Label>
          <Input
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <Input
            type="textarea"
            name="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormGroup>
            <Label htmlFor="priceNormal">Start Date:</Label>
            <Input type="text" 
            value={dateStart}
            onChange={(e) => setDateStart(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="priceNormal">End Date:</Label>
            <Input type="text"
            value={dateEnd}
            onChange={(e) => setDateEnd(e.target.value)}
             />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="priceNormal" value={priceNormal}
            onChange={(e) => setPriceNormal(e.target.value)}
            >Price Normal:</Label>
            <Input type="text" />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="priceEarlyBird" value={priceEarlyBird}
            onChange={(e) => setPriceEarlyBird(e.target.value)}>Price Early Bird:</Label>
            <Input type="text" />
          </FormGroup>
        </FormGroup>
        {Object.keys(checkBookable).map((key) => (
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                onChange={handleToggle}
                key={key}
                name={key}
                checked={checkBookable[key]}
              />
              Bookable
            </Label>
          </FormGroup>
        ))}
        <h4>Instructors</h4>
        {options.map((i) => (
          <label style={{ marginRight: "5px" }}>
            <input
              type="checkbox" 
              key={i.id}
              name={i.id}
              value={i.id}
              checked={instructors.includes(i.id)}
              onChange={onCheckedChanged}
            />{" "}
            {i.name.first + " " + i.name.last}
          </label>
        ))}
        <input type="submit" value="Submit" />
      </Form>
    </Container>
  );
};

export default EditCourse;
