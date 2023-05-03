import React from "react";

import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import { Component } from "react";

class NavBarAuth extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <nav>
        {currentUser ? (
          <div>
            <li>
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li>
              <a href="/login" className="nav-link" onClick={this.logOut}>
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div>
            <li>
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>

            <li>
              <Link to={"/register"} className="nav-link">
                Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>
    );
  }
}

export default NavBarAuth;
