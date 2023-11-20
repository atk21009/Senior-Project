import React from "react";
import { Field, reduxForm } from "redux-form";

import icon from "../../imgs/icon/iconWhite.svg";

import validateEmails from "../../store/utils/Validation/validateEmail";
import _ from "lodash";
import SignUpField from "./SignUpField";
import SignUpFields from "./SignUpFields";

const SignUp = (props) => {
  const { handleSubmit } = props;

  function renderFields() {
    return _.map(SignUpFields, ({ label, name, type }) => {
      return (
        <div className="form-field" key={name + "1"}>
          <Field
            component={SignUpField}
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
      <div className="auth">
        <img src={icon} alt="icon" className="auth-icon" />
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit} className="form">
          {renderFields()}
          <div className="form-field submit">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
      </div>
    </div>
  );
};

function validate(values) {
  const errors = {};
  errors.email = validateEmails(values.email || "");

  _.each(SignUpFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Please enter a value";
    }
  });

  if (values["password"] !== values["confirmPassword"]) {
    errors["confirmPassword"] = "Passwords must match";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "SignUpForm",
})(SignUp);
