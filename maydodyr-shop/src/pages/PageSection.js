import React from "react";
import { connect } from "react-redux";

import Catalog from "../components/Catalog";
import { set_section } from "../redux/actions/sort";

class PageSection extends React.PureComponent {
  componentDidMount() {
    if (this.props.match.params.section !== this.props.sort.section)
      this.props.dispatch(set_section(this.props.match.params.section));
  }

  render() {
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
