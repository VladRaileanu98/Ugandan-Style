import React, { useState, useEffect } from "react";
import LessonService from "../../services/LessonService";
import { Link, useNavigate, useParams } from "react-router-dom";

const AddLessonComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quizId, setQuizId] = useState(false);
  const [courseId, setCourseId] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateLesson = (e) => {
    e.preventDefault();
    const lessonEntity = { name, description, quizId };

    LessonService.updateLesson(id, lessonEntity)
      .then((response) => {
        navigate(`/course/${courseId}/lessons`);
        console.log("quiz id: " + lessonEntity.quizId);

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getLessonCourseId = () => {
    LessonService.getParentCourseId(id)
      .then((response) => {
        setCourseId(response.data);
        console.log("course id:" + response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    LessonService.getLessonById(id)
      .then((response) => {
        //console.log(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setQuizId(response.data.quizId);
      })
      .catch((error) => {
        console.log(error);
      });

    getLessonCourseId(id);
  }, [id]);

  return (
    <div>
      <br />
      <br />
      <div>
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> Update Lesson </h2>
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> Lesson name: </label>
                  <input
                    type="text"
                    placeholder="Enter lesson name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Quiz deadline: </label>
                  <input
                    type="text"
                    placeholder="Enter lesson description"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>

                <div className="form-group mb-2">
                  <label className="form-label"> Lesson quizId: </label>
                  <input
                    type="text"
                    placeholder="Enter lesson description"
                    name="quizId"
                    className="form-control"
                    value={quizId}
                    onChange={(e) => setQuizId(e.target.value)}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateLesson(e)}
                >
                  Save Lesson
                </button>
                <Link
                  to={`/course/${courseId}/lessons`}
                  className="btn btn-danger"
                >
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLessonComponent;
