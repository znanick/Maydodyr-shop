import React from "react";

import { Route } from "react-router-dom";

import MainPage from "../components/MainPage";
import Catalog from "../components/Catalog";



class PagesRouter extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={MainPage} />
        <Route path="/catalog" exact component={Catalog} />
        <Route path="/catalog/:section" component={Catalog} />
      </div>
    );
  }
}

export default PagesRouter;
