import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/CourseService";

const AddCourse = () => {
  const [course, setCourse] = useState({
    id: "",
    name: "",
    description: "",
    embedLink: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setCourse({ ...course, [e.target.name]: value });
  };

  const saveCourse = (e) => {
    e.preventDefault();
    CourseService.saveCourse(course)
      .then((response) => {
        console.log(response);
        navigate("/course/showAll");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setCourse({
      id: "",
      name: "",
      description: "",
      embedLink: "",
    });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>add new Course</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            name
          </label>
          <input
            type="text"
            name="name"
            value={course.name}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            description
          </label>
          <input
            type="text"
            name="description"
            value={course.description}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            embed link
          </label>
          <input
            type="text"
            name="embedLink"
            value={course.embedLink}
            onChange={(e) => handleChange(e)}
            className="h-10 w-96 border mt-2 px-2 py-2"
          ></input>
        </div>

        <div className="items-center justify-center h-14 w-full my-4 space-x-4 pt-4">
          <button
            onClick={saveCourse}
            className="rounded text-white font-semibold bg-green-400 py-2 px-6 hover:bg-green-700"
          >
            save
          </button>
          <button
            onClick={reset}
            className="rounded text-white font-semibold bg-red-400 py-2 px-6 hover:bg-red-700"
          >
            clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
