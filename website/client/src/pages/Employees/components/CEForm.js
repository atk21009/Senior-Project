import React from "react";
import { Field, reduxForm } from "redux-form";

import _ from "lodash";

import CEField from "./CEField";
import CEFields from "./CEFields";

const CEForm = (props) => {
  const { handleSubmit } = props;

  function renderFields() {
    return _.map(CEFields, ({ label, placeholder, name, type, id }) => {
      return (
        <div className="CE-field" key={name + "1"}>
          <Field
            component={CEField}
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
    <>
      <div className="CE-disclaimer">
        ** All values are optional except for First name, Last name, Email, and
        Employee Number. If you wish to not enter specific information just
        leave the input empty. **
      </div>
      <form onSubmit={handleSubmit} className="form-CE">
        {renderFields()}
        <div className="createEmp">
          <input type="submit" id="CE-Submit" value="Create Employee" />
        </div>
      </form>
    </>
  );
};

function validate(values) {
  const errors = {};

  if (!values["firstname"]) {
    errors["firstname"] = "Please enter a value";
  }
  if (!values["lastname"]) {
    errors["lastname"] = "Please enter a value";
  }
  if (!values["email"]) {
    errors["email"] = "Please enter a value";
  }
  if (!values["empNum"]) {
    errors["empNum"] = "Please enter a value";
  }

  return errors;
}

export default reduxForm({
  validate,
  form: "CreateEmployee",
})(CEForm);
