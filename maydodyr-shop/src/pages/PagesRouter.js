import React from "react";

import { Route } from "react-router-dom";

import MainPage from "../components/MainPage";
import Catalog from "../components/Catalog";
import PageItem from "./PageItem";
import Login from "../components/Login";
import PageSection from "./PageSection";



class PagesRouter extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={MainPage} />
        <Route path="/catalog" exact component={PageSection} />
        <Route path="/catalog/item/:id" component={PageItem} />
        <Route path="/catalog/:section" exact component={PageSection} />
        <Route path="/login" component={Login} />
        
      </div>
    );
  }
}

export default PagesRouter;
