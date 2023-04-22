import React, { useEffect, useState } from "react";
import Select from "react-dropdown-select";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import UserService from "../../services/UserService";

const User = ({ user, deleteUser }) => {
  const navigate = useNavigate();
  const editUser = (e, id) => {
    e.preventDefault();
    navigate(`/user/update/${id}`);
  };

  const userCoursePage = (e, id1, id2) => {
    e.preventDefault();
    navigate(`/user/${user.id}/course/${id2}`, {
      state: {
        userId: id1,
        courseId: id2,
      },
    });
  };

  const [courses, setCourses] = useState();
  const [loading, setLoading] = useState(true);
  const [aValue, setAValue] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await UserService.getUserCourses(user.id);
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const items = courses?.map((course) => {
    return { id: course.id, name: course.name };
  });
  return (
    <tr key={user.id}>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.username}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{user.email}</div>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <Select
          name="select"
          options={items}
          labelField="name"
          valueField="id"
          onChange={(items) => setAValue(items[0].name)}
        ></Select>
      </td>
      <td className="text-left px-6 py-4 whitespace-nowrap">
        <a
          onClick={(e, id1, id2) => userCoursePage(e, user.username, aValue)}
          className="text-white hover:text-indigo-800 px-4 hover:cursor-pointer font-semibold rounded border bg-emerald-600"
        >
          access {aValue}
        </a>
      </td>
      <td className="text-right px-1 py-4 whitespace-nowrap font-medium text-sm">
        <a
          onClick={(e, id) => editUser(e, user.id)}
          className="text-white hover:text-indigo-800 px-4 hover:cursor-pointer font-semibold rounded border bg-slate-600"
        >
          edit
        </a>
        <a
          onClick={(e, id) => deleteUser(e, user.id)}
          className="text-red-200 hover:text-indigo-800 px-4 hover:cursor-pointer font-semibold rounded border bg-slate-400"
        >
          delete
        </a>
      </td>
    </tr>
  );
};

export default User;
