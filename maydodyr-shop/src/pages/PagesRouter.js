import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import MainPage from "../components/MainPage";
import PageItem from "./PageItem";
import Login from "../components/Login";
import PageSection from "./PageSection";
import AddItem from "../components/AddItem";

class PagesRouter extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={MainPage} />
        <Route path="/catalog" exact component={PageSection} />
        <Route path="/catalog/item/:id" component={PageItem} />
        <Route path="/catalog/:section" exact component={PageSection} />
        <Route path="/login" component={Login} />
        <Route
          path="/addItem"
          component={(props) =>
            this.props.usersData.isActiveUserAdmin ? (
              <AddItem />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usersData: state.usersData,
});

export default connect(mapStateToProps)(PagesRouter);
