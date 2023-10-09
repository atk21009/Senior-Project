import React, { Component } from "react";

import SignUpForm from "./SignUpForm";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class SignUp extends Component {
  render() {
    return (
      <div className="page">
        <SignUpForm onSubmit={this.props.signup} />
      </div>
    );
  }
}

export default connect(null, actions)(SignUp);
