import React from "react";
import { Menu, Input } from "semantic-ui-react";
import { connect } from "react-redux";

import "./style/Sort.css";

import { set_query, set_filter } from "../redux/actions/sort";

class Sort extends React.PureComponent {
  state = {
    activeItem: "all",
  };

  handleItemClick = (e, { name }) => {
    this.props.cbLoadData(
      name,
      this.props.sort.searchQuery,
      this.props.itemsCatalog.currentPage
    );
    this.setState({ activeItem: name });
    this.props.dispatch(set_filter(name));
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Menu secondary>
        <Menu.Item
          name="all"
          active={activeItem === "all"}
          onClick={this.handleItemClick}
        >
          Все
        </Menu.Item>
        <Menu.Item
          name="priceLow"
          active={activeItem === "priceLow"}
          onClick={this.handleItemClick}
        >
          С дешевых
        </Menu.Item>
        <Menu.Item
          name="priceHight"
          active={activeItem === "priceHight"}
          onClick={this.handleItemClick}
        >
          С дорогих
        </Menu.Item>
        <Menu.Item name="search">
          <Input
            icon="search"
            placeholder="Поиск"
            value={this.props.sort.searchQuery}
            onChange={(EO) => {
              this.props.cbLoadData(
                this.props.sort.searchQuery.filterBy,
                EO.target.value,
                this.props.itemsCatalog.currentPage
              );
              this.props.dispatch(set_query(EO.target.value));
            }}
          />
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = (state) => ({
  sort: state.sort,
  itemsCatalog: state.itemsCatalog,
});

export default connect(mapStateToProps)(Sort);
