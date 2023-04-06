import { useEffect, useState } from "react";
import axios from "../api/axios";

const Courses = () => {
  const [courses, setCourses] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getCourses = async () => {
      try {
        const response = await axios.get("/course/showAll", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setCourses(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getCourses();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2> courses list </h2>
      {courses?.length ? (
        <ul>
          {courses.map((course, i) => (
            <li key={i}>{course?.name}</li>
          ))}
        </ul>
      ) : (
        <p>no courses to display</p>
      )}
    </article>
  );
};

export default Courses;
