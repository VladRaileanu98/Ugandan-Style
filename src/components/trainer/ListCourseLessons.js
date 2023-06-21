import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CourseService from "../../services/CourseService";

function ListLessonComponent() {
  const [lessons, setLessons] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
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
    <body className="min-h-screen bg-gradient-to-r from-gray-500  to-gray-900">
      <div className="container content-center mx-auto">
        <h2 className="text-center py-3 text-white">
          {" "}
          Course No. {id} Lessons{" "}
        </h2>
        <button
          onClick={() => navigate(`/course/${id}/add-lesson`)}
          className="rounded bg-slate-600 text-white px-6 py-2 font-semibold"
        >
          add lesson
        </button>

        <button
          onClick={() => navigate(`/course/showAll`)}
          className="rounded bg-slate-400 text-white px-6 py-2 font-semibold"
        >
          back to course
        </button>
        <table className="table table-bordered border-black table-striped bg-white">
          <thead style={{ textAlign: "center" }}>
            <th> id </th>
            <th> name</th>
            <th> description</th>
            <th> quiz </th>
            <th> video </th>
            <th> actions </th>
          </thead>
          {lessons?.length ? (
            <tbody>
              {lessons.map((lesson) => (
                <tr style={{ textAlign: "center" }} key={lesson.id}>
                  <td> {lesson.id} </td>
                  <td> {lesson.name} </td>
                  <td> {lesson.description} </td>
                  <td> {lesson.quizId} </td>
                  <td> {lesson.videoLink} </td>
                  <td>
                    <Link
                      to={`/edit-lesson/${lesson.id}`}
                      className="btn btn-warning"
                    >
                      edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p>no lessons to display</p>
          )}
        </table>
      </div>
    </body>
  );
}

export default ListLessonComponent;
