import axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/user";

class UserService {
  saveUser(user) {
    return axios.post(USER_API_BASE_URL + "/signUp", user);
  }
}

export default new UserService();
