import React from "react";
import { Field, reduxForm } from "redux-form";

import icon from "../../imgs/icon/iconWhite.svg";

import validateEmails from "../../store/utils/Validation/validateEmail";
import _ from "lodash";
import LoginField from "./LoginField";
import LoginFields from "./LoginFields";

const Login = (props) => {
  const { handleSubmit } = props;

  function renderFields() {
    return _.map(LoginFields, ({ label, name, type }) => {
      return (
        <div className="form-field" key={name + "1"}>
          <Field
            component={LoginField}
            type={type}
            label={label}
            name={name}
            key={name}
          />
        </div>
      );
    });
  }

  return (
    <div className="auth-ctnr">
      <div className="auth login">
        <img src={icon} alt="icon" className="auth-icon" />
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="form-login">
          {renderFields()}
          <div className="form-field submit">
            <input type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

function validate(values) {
  const errors = {};
  errors.email = validateEmails(values.email || "");

  _.each(LoginFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Please enter a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "LoginForm",
})(Login);
