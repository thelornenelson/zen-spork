import React from "react";
import Navbar from "../../Recipes/components/Navbar.jsx";

export default class Sessions extends React.Component {
  constructor() {
    super();

    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    const isEnabled = this.state.first_name && this.state.last_name && this.state.email && this.state.password.length > 2;

    return (
      <div>
        <Navbar current_user={this.props.current_user} />
        <div className="session-box">
          <h1>Register</h1>
          <form method="post" action="/users">
            <div className="form-group required">
              <label htmlFor="formGroupExampleInput">First Name</label>
              <input type="text" name="first_name" className="form-control" id="formGroupExampleInput" placeholder="Enter First Name" value={this.state.first_name} onChange={this.handleChange}/>
            </div>
            <div className="form-group required">
              <label htmlFor="formGroupExampleInput2">Last Name</label>
              <input type="text" name="last_name" className="form-control" id="formGroupExampleInput2" placeholder="Enter Last Name" value={this.state.last_name} onChange={this.handleChange} />
            </div>
            <div className="form-group required">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" value={this.state.email} onChange={this.handleChange}/>
            </div>
            <div className="form-group required">
              <label htmlFor="formGroupExampleInput">Password</label>
              <input type="text" name="password" className="form-control" id="formGroupExampleInput" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange}/>
            </div>
            <div className="required">
              <label>Required fields</label>
              <button type="submit" className="btn btn-primary" disabled={!isEnabled}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}