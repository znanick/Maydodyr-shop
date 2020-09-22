import React from "react";
import { connect } from "react-redux";
import isoFetch from "isomorphic-fetch";

import { set_catalog, add_item } from "../redux/actions/catalog";
import Catalog from "../components/Catalog";
import { set_section } from "../redux/actions/sort";

class PageSection extends React.PureComponent {
  

  render() {
    console.log("page section render");
    if (this.props.match.params.section != this.props.sort.section)
      this.props.dispatch(set_section(this.props.match.params.section));

    return (
      <div>
        <Catalog />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  sort: state.sort,
});

export default connect(mapStateToProps)(PageSection);
