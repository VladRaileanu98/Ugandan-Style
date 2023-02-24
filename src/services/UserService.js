import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/user";

class UserService {
  saveUser(user) {
    return axios.post(USER_API_BASE_URL + "/signUp", user);
  }

  getUsers() {
    return axios.get(USER_API_BASE_URL + "/showAll");
  }

  getUserById(id) {
    return axios.get(USER_API_BASE_URL + "/showById" + "/" + id);
  }

  deleteUser(id) {
    return axios.delete(USER_API_BASE_URL + "/delete" + "/" + id);
  }

  updateUser(id, user) {
    return axios.put(USER_API_BASE_URL + "/update" + "/" + id, user);
  }
}

export default new UserService();
