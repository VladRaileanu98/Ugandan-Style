import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import CourseService from "../services/CourseService";

const UserCoursePage = () => {
  const navigate = useNavigate();

  function embedVideo(e, link, description) {
    alert("You clicked me!");
    navigate(`/embedded/video`, {
      state: {
        courseLink: link,
        courseDescription: description,
      },
    });
  }

  const location = useLocation();
  console.log(location);

  const [username, setUsername] = useState("");
  const [coursename, setCoursename] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [courseDescription, setCourseDescription] = useState("");

  useEffect(() => {
    console.log("page is fully loaded");
    UserService.getUserById(location.state.userId)
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.log(error);
      });
    CourseService.getCourseById(location.state.courseId)
      .then((response) => {
        setCoursename(response.data.name);
        setImageLink(response.data.imageLink);
        setCourseDescription(response.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  console.log(imageLink);

  return (
    <>
      <div className="text-3xl text-center">
        This is {username} 's course page on {coursename}
      </div>
      <br />
      <div className="text-2xl text-center">
        user id: {location.state.userId}
      </div>
      <div className="text-2xl text-center">
        course id: {location.state.courseId}
      </div>
      <div class="flex flex-col h-screen my-auto items-center">
        <button
          onClick={(e, link, description) =>
            embedVideo(e, imageLink, courseDescription)
          }
          type="button"
          class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Access Embedded Video
        </button>
      </div>
    </>
  );
};

export default UserCoursePage;
