import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Container } from "semantic-ui-react";
import isoFetch from "isomorphic-fetch";
import { connect } from "react-redux";
import { set_catalog, add_item } from "./redux/actions/catalog";
import "./App.css";

import PagesRouter from "./pages/PagesRouter";
import HeadMenu from "./components/HeadMenu";

class App extends React.PureComponent {
  

  render() {
    return (
      <Container>
        <HeadMenu />
        <PagesRouter />
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  itemsCatalog: state.itemsCatalog,
  sort: state.sort,
});

export default connect(mapStateToProps)(App);
