import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import img from "../../logo.jpg";
import firebase from "firebase";

import { useHistory } from "react-router-dom";
import "./SignUp.css";
import { login } from "../../features/userSlice";
import { useDispatch } from "react-redux";
const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, errors } = useForm();
  const [error, setError] = useState("");
  const signUp = (data) => {
    if (data.password != data.repeatPassword) {
      return alert("password doesn't match!");
      //  setError("password doesn't match.");
    } else if (data.password.length < 4) {
      return alert("password must be min 8 characters!");
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        userCredential.user.updateProfile({
          displayName: `${data.firstName} ${data.lastName}`,
        });

        history.push("/");
        firebase
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            console.log("verified");
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error.message);
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // ..
      });
  };
  return (
    <div className="signup__container">
      <img src={img} alt="" />
      <div className="SignUpForm_container">
        <h2>sign up</h2>
        <form onSubmit={handleSubmit(signUp)}>
          <label htmlFor="first name">first Name</label>
          <input
            ref={register({ required: true })}
            name="firstName"
            placeholder="firstname"
            type="text"
          />
          {errors.firstName && <p>firstname is required</p>}
          <label htmlFor="last name">last Name</label>
          <input
            ref={register({ required: true })}
            name="lastName"
            placeholder="lastname"
            type="text"
          />
          {errors.lastName && <p>lastName is required</p>}
          <label htmlFor="email">Email</label>
          <input
            ref={register({ required: true })}
            name="email"
            placeholder="email"
            type="email"
          />
          {errors.email && <p>email is required</p>}
          <label htmlFor="email">Password</label>
          <input
            ref={register({ required: true })}
            name="password"
            type="password"
            placeholder="password"
          />
          {errors.password && <p>password is required</p>}
          <label htmlFor="password">repeat password</label>
          <input
            ref={register({ required: true })}
            name="repeatPassword"
            type="password"
            placeholder="password"
          />
          {errors.repeatPassword && <p>password is required</p>}
          {error && <p>{error}</p>}

          <Button type="submit" className="signup_btn">
            Sign up
          </Button>
          <p className="login__or">already have an account?</p>
          <Button
            onClick={(e) => history.replace("/login")}
            className="btn_backsignin"
          >
            back to sign in
          </Button>
          {/* <p className="login__or">or</p>
          <Button className="login_container_google" onClick={loginWithGoogle}>
            <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" />
            <p>Sign in with Google</p>
          </Button> */}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
