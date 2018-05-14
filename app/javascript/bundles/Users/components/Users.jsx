import React from "react";
import Navbar from "../../Recipes/components/Navbar.jsx";

export default class Sessions extends React.Component {

  render() {

    return (
      <div className="container">
        <Navbar current_user={this.props.current_user} />
        <div className="session-box">
          <h1>Sign Up</h1>
          <form method="post" action="/users">
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">First Name</label>
              <input type="text" name="first_name" className="form-control" id="formGroupExampleInput" placeholder="Enter First Name" />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput2">Last Name</label>
              <input type="text" name="last_name" className="form-control" id="formGroupExampleInput2" placeholder="Enter Last Name" />
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Email" />
            </div>
            <div className="form-group">
              <label htmlFor="formGroupExampleInput">Password</label>
              <input type="text" name="password" className="form-control" id="formGroupExampleInput" placeholder="Enter Password" />
            </div>
            <button type="submit" className="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}