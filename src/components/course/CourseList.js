import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/CourseService";
import Course from "./Course";

const CourseList = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await CourseService.getCourses();
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
    setRole(window.localStorage.getItem("role"));
    console.log(role);
  }, []);

  const deleteCourse = (e, id) => {
    e.preventDefault();
    CourseService.deleteCourse(id).then((res) => {
      if (courses) {
        setCourses((prevElement) => {
          return prevElement.filter((course) => course.id !== id);
        });
      }
    });
  };

  return (
    <body className="min-h-screen bg-emerald-200">
      <div className="container mx-auto my-50 ">
        <div className="h-12">
          <button
            onClick={() => navigate("/course/add")}
            className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
          >
            add course
          </button>
          <button
            onClick={() => navigate("/user/showAll")}
            className="rounded bg-slate-400 text-white px-6 py-2 font-semibold"
          >
            go to users page
          </button>
        </div>
        <div className="flex shadow border-b">
          <table className="min-w-full">
            <thead className="bg-red-300">
              {role === "user" ? (
                <tr>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    name
                  </th>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    description
                  </th>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    lesson
                  </th>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    actions
                  </th>
                </tr>
              ) : (
                <tr>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    name
                  </th>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    description
                  </th>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    embedLink
                  </th>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    quiz
                  </th>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    lesson
                  </th>
                  <th className="text-center font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                    actions
                  </th>
                </tr>
              )}
            </thead>
            {!loading && (
              <tbody className="bg-orange-100">
                {courses.map((course) => (
                  <Course
                    course={course}
                    deleteCourse={deleteCourse}
                    key={course.id}
                  ></Course>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </body>
  );
};

export default CourseList;
