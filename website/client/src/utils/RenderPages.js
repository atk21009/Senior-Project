// Module Imports
import { Route } from "react-router-dom";
//Component Imports
import ProtectedRoute from "./ProtectedRoute";
import { pages, authPages } from "../pages";

export function renderPages() {
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

export function renderAuthPages(props) {
  return authPages.map((element) => {
    return (
      <Route
        exact
        path={element.path}
        element={<ProtectedRoute />}
        key={element.path}
      >
        <Route exact path={element.path} Component={element.component} />
      </Route>
    );
  });
}
