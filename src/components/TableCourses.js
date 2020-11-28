import React, { useEffect, useState } from "react";
import { Table, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { API } from "../api";
import { BiCalendarCheck,BiCalendarX } from 'react-icons/bi';

const TableCourses = (props) => {
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
    <Table hover style={{ marginTop: "50px" }}>
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Bookable</th>
          <th>Price</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((cour) => (
          <tr key={cour.id}>
            <th scope="row"></th>
            <td>{cour.title}</td>
            <td style={{textAlign: 'center'}}>{cour.open ? <BiCalendarCheck className="table-icon-check"/> : <BiCalendarX className="table-icon-uncheck" />}</td>
            <td>{cour.price?.normal} €</td>
            <td>
              {cour.dates?.start_date} - {cour.dates?.end_date}
            </td>
            <td>
              <Button style={{ background:'#F15B41'}}>
                <Link
                  style={{ textDecoration: "none", color: '#fff' }}
                  to={{ pathname: `/courses/${cour.id}` }}
                >
                  Learn more
                </Link>
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableCourses;
