import React, { useEffect, useState } from "react";
import LessonService from "../../services/LessonService";
import ScrollSpy from "react-ui-scrollspy";

function LessonPage() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    getAllLessons();
  }, []);

  const getAllLessons = () => {
    LessonService.getAllLessons()
      .then((response) => {
        setLessons(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {lessons.map((lesson) => (
        <div class="container flex flex-col my-4 items-stretch rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-2xl md:flex-column">
          <img
            class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src="https://tecdn.b-cdn.net/wp-content/uploads/2020/06/vertical.jpg"
            alt=""
          />
          <div class="flex flex-col justify-start p-6">
            <h5 class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
              {lesson.name}
            </h5>
            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
              {lesson.description}
            </p>
            <p class="text-xs text-neutral-500 dark:text-neutral-300">
              Last updated 3 mins ago
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LessonPage;
