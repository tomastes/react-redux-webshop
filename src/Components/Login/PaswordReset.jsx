import React from "react";
import { useForm } from "react-hook-form";
import "./Login.css";
import img from "../../logo.jpg";
import { auth } from "../../firebase";
import { Button } from "@material-ui/core";

const PaswordReset = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const sendResetPasswordEmail = (data) => {
    const emailAddress = data.email;

    auth
      .sendPasswordResetEmail(emailAddress)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        alert(error.message);
      });
  };
  return (
    <div className="login__container">
      <img src={img} alt="" />
      <div className="form__container">
        <h2>password recovery</h2>
        <p>
          enter your email adress. we will send you a password recovery link.
        </p>
        <form onSubmit={handleSubmit(sendResetPasswordEmail)}>
          <label htmlFor="email">Email</label>
          <input
            ref={register({ required: true })}
            name="email"
            placeholder="email"
            type="email"
          />
          {errors.email && <p>email is required</p>}
          <Button type="submit" className="signin_btn">
            send reset email
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaswordReset;
