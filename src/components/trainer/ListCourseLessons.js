import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import CourseService from "../../services/CourseService";

function ListLessonComponent() {
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

  return (
    <div className="container">
      <h2 className="text-center"> Course No. {id} Lessons </h2>
      <Link to={`/course/${id}/add-lesson`} className="btn btn-primary">
        {" "}
        Add Lesson to course no.{id}
      </Link>
      <Link to={`/course/showAll`} className="btn btn-danger">
        Take me back to course no. {id}
      </Link>
      <table className="table table-bordered table-striped">
        <thead style={{ textAlign: "center" }}>
          <th> Lesson Id </th>
          <th> Lesson name</th>
          <th> Lesson description</th>
        </thead>
        {lessons?.length ? (
          <tbody>
            {lessons.map((lesson) => (
              <tr style={{ textAlign: "center" }} key={lesson.id}>
                <td> {lesson.id} </td>
                <td> {lesson.name} </td>
                <td> {lesson.description} </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p>no lessons to display</p>
        )}
      </table>
    </div>
  );
}

export default ListLessonComponent;
