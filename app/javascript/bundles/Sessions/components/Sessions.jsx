import React from "react";
import Navbar from "../../Recipes/components/Navbar.jsx";

export default class Sessions extends React.Component {
  render() {
    return (
      <div>
        <Navbar current_user={this.props.current_user} />
        <span> {this.props.current_user} </span>
        <div className="login-box">
          <h1>Please log in!</h1>
          <form method="post" action="/login">
                  Email:  <input type="email" name="email" />
                  Password: <input type="password" name="password" />
            <input type = "submit" />
          </form>
        </div>
      </div>
    );
  }
}