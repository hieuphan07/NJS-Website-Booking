import React from "react";

import "./Register.css";

const Register = () => {
  return (
    <div className="register-form">
      <div className="register-form__container">
        <h2 className="register-form__title">Save time, Save money!</h2>
        <p className="register-form__description">
          Sign up and we'll send the best deals to you
        </p>
        <div className="register-form__submit">
          <input
            type="email"
            placeholder="Your Email"
            className="register-form__input"
          />
          <button className="register-form__button">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
