// Module Imports
import React, { Component } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { connect } from "react-redux";

// Comnponent Imports
import Header from "./components/Header";
import Footer from "./components/Footer";
import { renderPages, renderAuthPages } from "./utils/RenderPages";

// Import Styling
import "./styles/Pages";
import "./styles/components";

// import actions
import * as actions from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
    if (localStorage.getItem("OrgToken")) {
      const token = localStorage.getItem("OrgToken");
      this.props.viewOrganization({ _id: token });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          {renderPages()} {renderAuthPages(this)}
        </Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
