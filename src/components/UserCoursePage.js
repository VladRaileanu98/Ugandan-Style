import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseService from "../services/CourseService";

const UserCoursePage = () => {
  const navigate = useNavigate();

  function sayHello() {
    alert("You clicked me!");
    navigate("/embedded/video");
  }

  const location = useLocation();
  console.log(location);
  const [course, setCourse] = useState({
    id: location.state.courseId,
    name: "",
    description: "",
    embedLink: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CourseService.getCourseById(
          location.state.courseId
        );
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handleChange = (e) => {
    const value = e.target.value;
    setCourse({ ...course, [e.target.name]: value });
  };
  console.log(course);
  return (
    <>
      <div className="text-3xl text-center">
        This is {location.state.userId}'s course page on{" "}
        {location.state.courseId}
      </div>
      <br />
      <div className="text-2xl text-center">
        user id: {location.state.userId}
      </div>
      <div className="text-2xl text-center">
        course id: {location.state.courseId}
      </div>
      <div className="flex flex-col h-screen my-auto items-center">
        <button
          onClick={sayHello}
          type="button"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Purple to Blue
        </button>
      </div>
      <div>
        <Container>
          <h1>Hello world!</h1>
          <div className="ratio ratio-16x9">
            <iframe
              width="560"
              height="315"
              src={course.embedLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserCoursePage;
