import React from "react";
import { useNavigate } from "react-router-dom";

const Course = ({ course, deleteCourse }) => {
  const navigate = useNavigate();
  const editCourse = (e, id) => {
    e.preventDefault();
    navigate(`/course/update/${id}`);
  };

  return (
    <tr key={course.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{course.name}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{course.description}</div>
      </td>
      <td className="text-right px-1 py-4 whitespace-nowrap font-medium text-sm">
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
};

export default Course;
