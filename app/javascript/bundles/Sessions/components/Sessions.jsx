import React from "react";
import Navbar from "../../Recipes/components/Navbar.jsx";

export default class Sessions extends React.Component {

  render() {

    return (
      <div>

        <Navbar current_user={this.props.current_user} />

        <div className="session-box">
          <h1>Login</h1>
          <form method="post" action="/login">
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>

        <div className="session-box">
          <h1>Register</h1>
          <div>
            <a href="/signup" className="btn btn-primary"> Register </a>
          </div>
        </div>
      </div>
    );
  }
}
