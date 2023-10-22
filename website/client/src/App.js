import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";

// Import Header & Footer
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import Pages
import pages from "./pages";

// Import Styling
import "./styles/Pages";

// import actions
import * as actions from "./store/actions";

function renderPages() {
  return pages.map((element) => {
    return (
      <Route
        exact
        path={element.path}
        Component={element.component}
        key={element.path}
      />
    );
  });
}

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
        <Routes>{renderPages()}</Routes>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default connect(null, actions)(App);
