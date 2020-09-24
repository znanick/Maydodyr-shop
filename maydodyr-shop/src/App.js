import React from "react";


import { Container } from "semantic-ui-react";

import { connect } from "react-redux";

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
