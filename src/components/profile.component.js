import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true });
    window.localStorage.setItem("role", currentUser.roles);
    window.localStorage.setItem("user_id", currentUser.id);
    window.localStorage.setItem("user_name", currentUser.username);
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />;
    }

    const { currentUser } = this.state;

    return (
      <div className="min-h-screen bg-emerald-200">
        <body className="container bg-white">
          {this.state.userReady ? (
            <div className="text-center">
              <div className="jumbotron text-center bg-gradient-to-r from-emerald-200  to-emerald-900">
                <h3>
                  <strong>{currentUser.username}'s</strong> profile
                </h3>
              </div>
              <p>
                <strong>token:</strong>{" "}
                {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(
                  currentUser.accessToken.length - 20
                )}
              </p>
              <p>
                <strong>id:</strong> {currentUser.id}
              </p>
              <p>
                <strong>email:</strong> {currentUser.email}
              </p>
              <strong>permission:</strong>
              <ul>
                {currentUser.roles &&
                  currentUser.roles.map((role, index) => (
                    <li key={index}>{role}</li>
                  ))}
                <script>console.log(":ceadwawd");</script>
              </ul>
            </div>
          ) : null}
        </body>
      </div>
    );
  }
}
