import React from "react"
import Navbar from "../../Recipes/components/Navbar.jsx"

export default class Sessions extends React.Component {

  render() {

    return (
      <div>

        <Navbar current_user={this.props.current_user} />

          <div className="register-box">

          <h1> Please Register! </h1>

            <form method="post" action="/users">
              <div className="form-group">
                <label for="formGroupExampleInput">First Name</label>
                <input type="text" name="first_name" className="form-control" id="formGroupExampleInput" placeholder="Enter First Name" />
              </div>
              <div className="form-group">
                <label for="formGroupExampleInput2">Last Name</label>
                <input type="text" name="last_name" className="form-control" id="formGroupExampleInput2" placeholder="Enter Last Name" />
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              </div>

              <div className="form-group">
                <label for="formGroupExampleInput">Password</label>
                <input type="text" name="password" className="form-control" id="formGroupExampleInput" placeholder="Enter Password" />
              </div>

              <button type="submit" className="btn btn-primary">Submit</button>

            </form>
          </div>

      </div>
    )
  }
}