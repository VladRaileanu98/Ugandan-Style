import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/CourseService";
import UserService from "../../services/UserService";
import axios from "axios";

const Course = ({ course, deleteCourse }) => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const data = window.localStorage.getItem("role");
    setRole(data);
    console.log(data);
  }, []);

  const navigate = useNavigate();
  const editCourse = (e, id) => {
    e.preventDefault();
    navigate(`/course/update/${id}`);
  };

  const addUserToCourse = (e, id) => {
    e.preventDefault();
    axios.put(
      "http://localhost:8080/user/add-course/" +
        id +
        "/" +
        window.localStorage.getItem("user_id")
    );
    alert("successfull enrollment to " + course.name);
    navigate(`/homepage`);
  };

  const addQuizToCourse = (e, id) => {
    e.preventDefault();
    navigate(`/course/${id}/quizzes`);
    console.log("this is the course id:" + id);
  };

  const addLessonToCourse = (e, id) => {
    e.preventDefault();
    navigate(`/course/${id}/lessons`);
    console.log("this is the course id:" + id);
  };

  if (role === "ROLE_USER") {
    return (
      <tr key={course.id}>
        <td className="text-center px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{course.name}</div>
        </td>
        <td className="text-center px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {course.description.substring(0, 20) + ".."}
          </div>
        </td>
        <td className="text-center  px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {course.lessonList.length}
          </div>
        </td>
        <td className="text-center py-4 whitespace-nowrap font-medium text-sm">
          <a
            onClick={(e, id) => addUserToCourse(e, course.id)}
            className="text-white hover:text-indigo-800 px-4 hover:cursor-pointer font-semibold rounded border bg-slate-600"
          >
            enroll
          </a>
        </td>
      </tr>
    );
  } else {
    return (
      <tr key={course.id}>
        <td className="text-center px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">{course.name}</div>
        </td>
        <td className="text-center px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {course.description.substring(0, 9) + ".."}
          </div>
        </td>
        <td className="text-center px-6 py-4 whitespace-nowrap">
          <div className="text-sm text-gray-500">
            {course.embedLink.substring(0, 9) + ".."}
          </div>
        </td>
        <td
          onClick={(e, id) => addQuizToCourse(e, course.id)}
          className="text-center md:hover:bg-orange-200 hover:cursor-pointer px-6 py-4 whitespace-nowrap"
        >
          <div className="text-sm text-gray-500">{course.quizList.length}</div>
        </td>
        <td
          onClick={(e, id) => addLessonToCourse(e, course.id)}
          className="text-center md:hover:bg-orange-200 hover:cursor-pointer px-6 py-4 whitespace-nowrap"
        >
          <div className="text-sm text-gray-500">
            {course.lessonList.length}
          </div>
        </td>
        <td className="text-center py-4 whitespace-nowrap font-medium text-sm">
          <a
            onClick={(e, id) => editCourse(e, course.id)}
            className="text-white hover:text-indigo-800 px-4 hover:cursor-pointer font-semibold rounded border bg-slate-600"
          >
            edit
          </a>
          <a
            onClick={(e, id) => deleteCourse(e, course.id)}
            className="text-red-200 hover:text-indigo-800 px-4 hover:cursor-pointer font-semibold rounded border bg-slate-400"
          >
            delete
          </a>
        </td>
      </tr>
    );
  }
};

export default Course;
