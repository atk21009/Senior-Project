import React from "react";
import { Field, reduxForm } from "redux-form";

import icon from "../../../imgs/icon/iconWhite.svg";

import _ from "lodash";

import COFields from "./COFields";
import COField from "./COField";
const COForm = (props) => {
  const { handleSubmit } = props;

  function renderFields() {
    return _.map(COFields, ({ label, placeholder, name, type, id }) => {
      return (
        <div className="org-field" key={name + "1"}>
          <Field
            component={COField}
            type={type}
            label={label}
            placeholder={placeholder}
            name={name}
            key={name}
            id={id}
          />
        </div>
      );
    });
  }

  return (
    <div className="COForm-ctnr">
      <div className="COForm">
        <img src={icon} alt="icon" className="auth-icon" />
        <h2>Create Organization</h2>

        <form onSubmit={handleSubmit} className="form-CO">
          {renderFields()}
          <div className="createOrg">
            <input type="submit" id="CO-Submit" value="Create Organization" />
          </div>
        </form>
      </div>
    </div>
  );
};
function validate(values) {
  const errors = {};

  _.each(COFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "Please enter a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: "CreateOrganization",
})(COForm);
