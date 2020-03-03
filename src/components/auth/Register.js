import React from "react";
import { connect } from "react-redux";
import "./register.scss";
import { withRouter } from "react-router-dom";
import axios from "axios";

import GroaWhite from "./GroaWhite.png";
import { Login } from "../../store/actions";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: "",
        user_name: "",
        password: "",
        confirmpassword: ""
      },
      submitted: false,
      input: {
        file: "",
        movies: ""
      },
      errorStatus: false
    };

    this.handleChange = this.handleChange.bind(this);
    // this.changeHandler = this.changeHandler.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.value);
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }



  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    console.log(
      "username, and password",
      this.state.user.user_name,
      this.state.user.password
    );
    // const { user } = this.state;
    if (
      this.state.user.email &&
      this.state.user.user_name &&
      this.state.user.password &&
      this.state.user.confirmpassword
    ) {
      // this.props.register(user);
      console.log(
        "username, and password",
        this.state.user.user_name,
        this.state.user.password
      );
    //   https://api.groa.us/
    //   "http://groabe-env.v3umry9g8h.us-east-1.elasticbeanstalk.com/
      axios.post("https://api.groa.us/api/users/register",{user_name: this.state.user.user_name, password: this.state.user.password}).then(res => {
          console.log("token: ", res.data.token);
          
          
          
          axios.post('https://api.groa.us/api/users/login', 
          {user_name: this.state.user.user_name, password: this.state.user.password}).then(res2 => {
              console.log('nested login successful', res2)

              const userid = res2.data.id;
              this.props.Login(userid);
              console.log('token: ', res2.data.token);
              localStorage.setItem('token', res2.data.token)

              this.props.history.push('/dashboard')
              

          })
          .catch(err2 => {
              console.log(err2)
              // this.props.history.push('/Error')
          })
        })
        .catch(err => {
          console.log("Registration Error", err);
          this.setState({ errorStatus: true });
          // this.props.history.push('/Error')
        });
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    // const { location, history } = this.props;
    return (
      <div className="container">
        <h3>Login</h3>

        <div className="H1">
          <div className="boxLeft">
            <img className="logo " src={GroaWhite} alt="groa logo" />
          </div>

          <div className="boxRight">
            <form className="form" onSubmit={this.handleSubmit}>
              <h2>Register</h2>

              <div
                className={
                  "forms" + (submitted && !user.email ? " has-error" : "")
                }
              ></div>
              <input
                className="form-control"
                type="text"
                name="email"
                value={user.email}
                onChange={this.handleChange}
                placeholder="Email"
              />
              {submitted && !user.email && (
                <div className="callingError">Email is required</div>
              )}

              <div
                className={
                  "forms" + (submitted && !user.user_name ? " has-error" : "")
                }
              ></div>
              <input
                className="form-control"
                type="text"
                name="user_name"
                value={user.user_name}
                onChange={this.handleChange}
                placeholder="Username"
              />
              {submitted && !user.user_name && (
                <div className="callingError">Username is required</div>
              )}

              <div
                className={
                  "forms" + (submitted && !user.password ? " has-error" : "")
                }
              ></div>

              <input
                className="form-control"
                type="password"
                name="password"
                value={user.password}
                onChange={this.handleChange}
                placeholder="Password"
              />
              {submitted && !user.password && (
                <div className="callingError">Password is required</div>
              )}

              <div
                className={
                  "forms" +
                  (submitted &&
                  !user.confirmpassword &&
                  user.confirmpassword.length <= 4
                    ? " has-error"
                    : "")
                }
              ></div>
              <input
                className="confirmPass"
                className="form-control"
                type="password"
                name="confirmpassword"
                value={user.confirmpassword}
                onChange={this.handleChange}
                placeholder="Confirm Password"
              />
              {submitted && !user.confirmpassword && (
                <div className="callingError">Confirm Password is required</div>
              )}

              <div className="checkBox">
                <div className="CheckB">
                  <input type="checkbox" />
                </div>

                <h5>Remember me</h5>
              </div>

              <div className="BottomLogin">
                <button className="LoginBtn">Login </button>
                {registering}
                {this.state.errorStatus ? (
                  <h3>Login Error, try again</h3>
                ) : (
                  <h3>Success</h3>
                )}
              </div>
            </form>
          </div>
          {/* end box right */}
        </div>
        {/*ends H1*/}
      </div>
    );
  }
}

const mapStateToProps = ({ dashboardMain }) => {
  return {
    userData: dashboardMain.userid,
    isFetching: dashboardMain.isPostingUser,
    error: dashboardMain.isPostingUserError
  };
};

export default withRouter(
  connect(mapStateToProps, {
    Login
  })(Register)
);
