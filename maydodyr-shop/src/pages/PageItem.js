import React from "react";
import { connect } from "react-redux";

import ItemInfo from "../components/ItemInfo";

class PageItem extends React.PureComponent {
  render() {
    const { isReady, catalog } = this.props.itemsCatalog;
    let ItemId = parseInt(this.props.match.params.id);


    return !isReady ? (
      "Loading..."
    ) : (
      <ItemInfo info={catalog.find((c) => c.id == ItemId)} />
    );
  }
}

const mapStateToProps = (state) => ({
  itemsCatalog: state.itemsCatalog,
});

export default connect(mapStateToProps)(PageItem);
