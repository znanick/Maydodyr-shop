import React from "react";
import { connect } from "react-redux";
import isoFetch from "isomorphic-fetch";

import {
  set_catalog,
  set_item,
  set_current_page,
} from "../redux/actions/catalog";
import ItemInfo from "../components/ItemInfo";

class PageItem extends React.PureComponent {
  componentDidMount() {
    this.dataRequest(this.props.match.params.id);
  }

  fetchError = (errorMessage) => {
    console.error(errorMessage);
  };

  dataRequest = (itemId) => {
    isoFetch(
      `http://localhost:3004/itemCatalog/${itemId}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) throw new Error("fetch error " + response.status);
        else return response.json();
      })
      .then((data) => {
        this.props.dispatch(set_item(data));
      })
      .catch((error) => {
        this.fetchError(error.message);
      });
  };

  render() {
    const { choosenItemIsReady, choosenItem } = this.props.itemsCatalog;
    let ItemId = parseInt(this.props.match.params.id);

    return !choosenItemIsReady ? (
      "Loading..."
    ) : (
      <ItemInfo info={choosenItem} />
    );
  }
}

const mapStateToProps = (state) => ({
  itemsCatalog: state.itemsCatalog,
});

export default connect(mapStateToProps)(PageItem);
