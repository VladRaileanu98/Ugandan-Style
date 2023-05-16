import axios from "axios";

const LESSON_API_BASE_URL = "http://localhost:8080/lesson";

class LessonService {
  getAllLessons() {
    return axios.get(LESSON_API_BASE_URL + "/showAll");
  }

  getLessonById(id) {
    return axios.get(LESSON_API_BASE_URL + "/showById/" + id);
  }

  getAllLessonsByCourseId(id) {
    return axios.get(LESSON_API_BASE_URL + "/showAll/" + id);
  }

  getParentCourseId(id) {
    return axios.get(LESSON_API_BASE_URL + "/" + id + "/course");
  }

  createLesson(lesson) {
    return axios.post(LESSON_API_BASE_URL + "/create", lesson);
  }

  updateLesson(id, lesson) {
    return axios.put(LESSON_API_BASE_URL + "/update/" + id, lesson);
  }

  deleteLesson(id) {
    return axios.delete(LESSON_API_BASE_URL + "/" + id);
  }
}
export default new LessonService();
