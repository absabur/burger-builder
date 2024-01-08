import React, { Component } from "react";
import { ErrorMessage, Formik } from "formik";
import "./auth.css";
import { authentication } from "../../redux/authAction";
import { connect } from "react-redux";
import LoadingPage from "../loading/LoadingPage";
import { Alert } from "reactstrap";

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, mode) =>
      dispatch(authentication(email, password, mode)),
  };
};

const mapStateToProps = (state) => {
  return {
    authLoading: state.authLoading,
    authError: state.authError,
  };
};

export class Auth extends Component {
  state = {
    mode: "log-in",
  };

  handleMode = () => {
    this.setState({
      mode: this.state.mode === "sign-up" ? "log-in" : "sign-up",
    });
  };

  render() {
    let err = null;
    if (this.props.authError) {
        err = <Alert color="danger">{this.props.authError}</Alert>
    }
    return (
      <div className="container">
        {err}
        {this.props.authLoading ? (
          <LoadingPage />
        ) : (
          <Formik
            onSubmit={(values) =>
              this.props.auth(values.email, values.password, this.state.mode)
            }
            initialValues={{
              // name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validate={(values) => {
              const errors = {};
              // if (this.state.mode === "sign-up") {
              //   if (!values.name) {
              //     errors.name = "Required";
              //   }
              // }

              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              if (!values.password) {
                errors.password = "Required";
              } else if (values.password.length < 6) {
                errors.password = "Password must be at least 6 characters";
              }

              if (this.state.mode === "sign-up") {
                if (!values.confirmPassword) {
                  errors.confirmPassword = "Required";
                } else if (values.password !== values.confirmPassword) {
                  errors.confirmPassword =
                    "Password and Confirm Password did not match";
                }
              }

              return errors;
            }}
          >
            {({ values, handleChange, handleSubmit }) => (
              <div className="p-4" style={{ boxShadow: "0 0 5px black" }}>
                <div style={{ textAlign: "center" }}>
                  {this.state.mode === "sign-up"
                    ? "Already have an account?"
                    : "Don't have an account?"}
                  <button
                    onClick={this.handleMode}
                    style={{
                      marginLeft: "5px",
                      backgroundColor: "tomato",
                      color: "white",
                    }}
                    className="btn"
                  >
                    {this.state.mode === "sign-up" ? "Log In" : "Sign Up"}
                  </button>
                </div>
                <h1 style={{ textAlign: "center", margin: "1rem" }}>
                  {this.state.mode === "sign-up" ? "Sign Up" : "Log In"}
                </h1>
                <form onSubmit={handleSubmit}>
                  {/* {this.state.mode === "sign-up" ? (
                        <>
                          <label>Name: </label>{" "}
                          <ErrorMessage name="name" component="span" />
                          <input
                            onChange={handleChange}
                            value={values.name}
                            className="form-control mb-4"
                            type="text"
                            name="name"
                            placeholder="Enter Your Name"
                          />
                        </>
                      ) : null} */}
                  <label>Email: </label>{" "}
                  <ErrorMessage name="email" component="span" />
                  <input
                    onChange={handleChange}
                    value={values.email}
                    className="form-control mb-4"
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                  />
                  <label>Password: </label>{" "}
                  <ErrorMessage name="password" component="span" />
                  <input
                    onChange={handleChange}
                    value={values.password}
                    className="form-control mb-4"
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                  {this.state.mode === "sign-up" ? (
                    <>
                      <label>Confirm Password: </label>{" "}
                      <ErrorMessage name="confirmPassword" component="span" />
                      <input
                        onChange={handleChange}
                        value={values.confirmPassword}
                        className="form-control mb-4"
                        type="password"
                        name="confirmPassword"
                        placeholder="Enter Password Again"
                      />
                    </>
                  ) : null}
                  <button style={{width: "100%"}} className="btn btn-success" type="submit">
                    {this.state.mode === "sign-up" ? "Sign Up" : "Log In"}
                  </button>
                </form>
              </div>
            )}
          </Formik>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
