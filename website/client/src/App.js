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

function renderPages() {
  return pages.map((element) => {
    return <Route exact path={element.path} Component={element.component} />;
  });
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>{renderPages()}</Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
