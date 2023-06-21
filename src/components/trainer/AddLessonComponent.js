import React, { useState, useEffect } from "react";
import LessonService from "../../services/LessonService";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddLessonComponent = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const saveOrUpdateLesson = (e) => {
    e.preventDefault();
    const lessonEntity = { name, description };

    LessonService.createLesson(lessonEntity)
      .then((response) => {
        console.log("response din save lesson" + JSON.stringify(response.data));
        axios.put(
          "http://localhost:8080/course/add-lesson/" +
            response.data.id +
            "/" +
            id
        );
        navigate(`/course/${id}/lessons`);
        console.log("this is the course id: " + id);
        console.log("this is the lesson id: " + response.data.id);
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    LessonService.getLessonById(id)
      .then((response) => {
        console.log(response.data);
        //setName(response.data.name);
        //setDescription(response.data.description);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      <br />
      <br />
      <div>
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h2 className="text-center"> Add Lesson </h2>
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
                  <label className="form-label"> Lesson description: </label>
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
                  <label className="form-label">
                    {" "}
                    Lesson embeded video link:{" "}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter lesson video link"
                    name="videoLink"
                    className="form-control"
                    value={videoLink}
                    onChange={(e) => setVideoLink(e.target.value)}
                  ></input>
                </div>

                <button
                  className="btn btn-success"
                  onClick={(e) => saveOrUpdateLesson(e)}
                >
                  Save Lesson
                </button>
                <Link to={`/course/${id}/lessons`} className="btn btn-danger">
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
