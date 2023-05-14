import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/course";

class CourseService {
  saveCourse(name, description, embedLink) {
    return axios.post(USER_API_BASE_URL + "/create", {
      name,
      description,
      embedLink,
    });
  }

  getCourses() {
    return axios.get(USER_API_BASE_URL + "/showAll");
  }

  getCourseQuizzes(id) {
    return axios.get(USER_API_BASE_URL + "/quizzes/" + id);
  }

  getCourseById(id) {
    return axios.get(USER_API_BASE_URL + "/showById/" + id);
  }

  updateCourse(id, course) {
    return axios.put(USER_API_BASE_URL + "/update" + "/" + id, course);
  }

  deleteCourse(id) {
    return axios.delete(USER_API_BASE_URL + "/delete" + "/" + id);
  }
}

export default new CourseService();
