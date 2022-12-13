import React, { useState } from "react";
import validate from "./validateInfo";
import useForm from "./useForm";
import Axios from "axios";
import { Navigate } from 'react-router-dom';
import "./Form.css";

const FormSignup = () => {
  const [userName, SetUserName] = useState("");
  const [password, SetPassword] = useState("");
  const [email, SetEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const submitReview = async (e) => {
    e.preventDefault();
    Axios.post("https://team20-seffafkart.herokuapp.com/api/insert", {
      userName: userName,
      password: password,
      email: email,
    }).then((err) => {
      alert("sucessfull insert");
      //console.log(err);
      if(err === null) {
        setSuccess(true);
      }
     });
  };

  const { handleChange, handleSubmit, values, errors } = useForm(validate);

  return (
    <>
    {success ? (
      <section>
      <Navigate to="/" />
      </section>
    ) : (
      <div className="form-content-right">
      <form className="form" noValidate>
        <h1>
          Get started with us today! Create your account by filling out the
          information below.
        </h1>
        <div className="form-inputs">
          <label className="form-label">Username</label>
          <input
            className="form-input"
            type="text"
            name="username"
            placeholder="Enter your username"
            onChange={(e) => {
              SetUserName(e.target.value);
            }}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Email</label>
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            onChange={(e) => {
              SetEmail(e.target.value);
            }}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Password</label>
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Enter your password"
            onChange={(e) => {
              SetPassword(e.target.value);
            }}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div className="form-inputs">
          <label className="form-label">Confirm Password</label>
          <input
            className="form-input"
            type="password"
            name="password2"
            placeholder="Confirm your password"
            value={values.password2}
            onChange={handleChange}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
        <button onClick={submitReview} className="form-input-btn" type="submit">
          Sign up
        </button>
        <span className="form-input-login">
          Already have an account? Login <a href="/login">here</a>
        </span>
      </form>
    </div>
    )}
    </>
  );
};

export default FormSignup;
