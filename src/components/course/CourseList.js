import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../../services/CourseService";
import Course from "./Course";

const CourseList = () => {
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
    <div className="container mx-auto my-8">
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
            <tr>
              <th className="text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                name
              </th>
              <th className="text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                description
              </th>
              <th className="text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                embedLink
              </th>
              <th className="text-left font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                no. of quizzes
              </th>
              <th className="text-right font-medium text-gray-700 uppercase tracking-wider py-3 px-6">
                actions
              </th>
            </tr>
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
  );
};

export default CourseList;
