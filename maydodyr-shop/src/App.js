import React from "react";
import "./App.css";

import { connect } from "react-redux";

import { set_catalog, add_item } from "./redux/actions/catalog";

class App extends React.PureComponent {
  componentDidMount() {
    let newItem = {
      id: 1,
      name: "Средство для мытья поверхностей",
      producer: "NovelHim",
      section: "surface",
    };
    this.props.dispatch(set_catalog(newItem));
  }

  render() {
    let catalog = this.props.catalog;
    console.log(this.props.catalog);
    return <h1>fhj</h1>;
  }
}

const mapStateToProps = (state) => ({
  catalog: state.catalog,
});

export default connect(mapStateToProps)(App);
