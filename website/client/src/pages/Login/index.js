import React, { Component } from "react";

import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class Login extends Component {
  render() {
    return (
      <div className="page">
        <LoginForm onSubmit={this.props.login} />
      </div>
    );
  }
}

export default connect(null, actions)(Login);
