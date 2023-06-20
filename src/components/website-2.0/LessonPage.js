import React, { useEffect, useState } from "react";
import LessonService from "../../services/LessonService";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import ScrollSpy from "react-ui-scrollspy";

function LessonPage() {
  const [lessons, setLessons] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAllLessonsByCourseId(id);
  }, [id]);

  const getAllLessonsByCourseId = () => {
    axios
      .get("http://localhost:8080/course/lessons/" + id) //pt ca cu QuizService.getAllQuestionsByQuiz(id) nu mergea
      .then((response) => {
        setLessons(response.data);
        console.log("response: " + JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const getAllLessons = () => {
  //   LessonService.getAllLessons()
  //     .then((response) => {
  //       setLessons(response.data);
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <div className="bg-gradient-to-r from-gray-500  to-gray-900">
      <header className="container text-center text-white text-lg bg-gradient-to-r from-gray-800  to-gray-500">
        cursul de matematica
      </header>
      <body>
        <div className="min-h-screen from bg-gradient-to-r from-gray-500  to-gray-900">
          {lessons?.length ? (
            <div>
              {lessons.map((lesson) => (
                <div class="container flex flex-col my-4 items-stretch rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-2xl md:flex-column">
                  <div class="flex flex-col justify-start p-6">
                    <h5 class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                      {lesson.name}
                    </h5>
                    <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      {lesson.description}
                    </p>
                    <p class="text-xs text-end text-neutral-500 dark:text-neutral-300">
                      Last updated 3 mins ago
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div class="container flex flex-col my-4 items-stretch rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-2xl md:flex-column">
              <div class="flex flex-col justify-start p-6">
                <h1 class="text-center mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                  no lesson to display.
                </h1>
              </div>
            </div>
          )}
        </div>
      </body>
    </div>
  );
}

export default LessonPage;
