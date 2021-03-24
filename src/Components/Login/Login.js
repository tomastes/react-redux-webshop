import { Button } from "@material-ui/core";
import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import img from "../../logo.jpg";
import { auth, db } from "../../firebase";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
const Login = () => {
  const history = useHistory();
  const { register, handleSubmit, watch, errors } = useForm();
  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((res) => {
        history.replace("/");
        db.collection("users").add({});
        console.log(res);
      })
      .catch((e) => {
        alert(e);
      });
  };
  const login = (data) => {
    auth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        history.push("/");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className="login__container">
      <img src={img} alt="" />
      <div className="form__container">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit(login)}>
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
          <p onClick={(e) => history.replace("/resetPasword")}>
            forgot password?
          </p>
          <Button type="submit" className="signin_btn">
            Sign in
          </Button>
          <p className="login__or">or</p>
          <Button className="login_container_google" onClick={loginWithGoogle}>
            <img src="https://img.icons8.com/fluent/48/000000/google-logo.png" />
            <p>Sign in with Google</p>
          </Button>
        </form>
        <div className="form__notmember">
          <p>not a member?</p>
          <p onClick={(e) => history.push("signup")}>Sign up</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
