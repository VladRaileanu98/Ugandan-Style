import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseService from "../../services/CourseService";

const UpdateCourse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    id: id,
    name: "",
    description: "",
    embedLink: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CourseService.getCourseById(id);
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

  const updateCourse = (e) => {
    e.preventDefault();
    CourseService.updateCourse(id, course)
      .then((response) => {
        console.log(response);
        navigate("/course/showAll");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex max-w-2xl mx-auto shadow border-b">
      <div className="px-8 py-8">
        <div className="font-thin text-2xl tracking-wider">
          <h1>update course</h1>
        </div>
        <div className="items-center justify-center h-14 w-full my-4">
          <label className="block text-gray-600 text-sm font-normal">
            Course name
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
            embedded link
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
            onClick={updateCourse}
            className="rounded text-white font-semibold bg-green-400 py-2 px-6 hover:bg-green-700"
          >
            update
          </button>
          <button
            onClick={() => navigate("/course/showAll")}
            className="rounded text-white font-semibold bg-red-400 py-2 px-6 hover:bg-red-700"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
