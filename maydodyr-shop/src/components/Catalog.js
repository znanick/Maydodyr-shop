import React from "react";
import isoFetch from "isomorphic-fetch";
import { Container, Card, Item, Image } from "semantic-ui-react";
import orderBy from "lodash/orderBy";
import "./style/Catalog.css";

import { connect } from "react-redux";

import {
  set_catalog,
  add_item,
  set_current_page,
} from "../redux/actions/catalog";
import { set_section } from "../redux/actions/sort";

import ItemComponent from "./ItemComponent";
import Sort from "./Sort";

class Catalog extends React.PureComponent {
  componentDidMount() {
    this.loadData();
    window.addEventListener(
      "popstate",

      this.loadData,
      false
    );
  }

  componentWillUnmount() {
    console.log("");
    window.removeEventListener(
      "popstate",

      this.loadData,

      false
    );
  }

  loadData = (pageNumber = this.props.itemsCatalog.currentPage) => {
    let section = this.props.sort.section
      ? "section=" + this.props.sort.section
      : "";
    this.dataRequest(section, pageNumber);
  };

  fetchError = (errorMessage) => {
    console.error(errorMessage);
  };
  dataRequest = (section, pageNumber) => {
    isoFetch(
      `http://localhost:3004/itemCatalog?${section}&_page=${pageNumber}&_limit=${this.props.itemsCatalog.pageSize}`,
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
        this.props.dispatch(set_catalog(data));
      })
      .catch((error) => {
        this.fetchError(error.message);
      });
  };

  filterCatalog = (filterBy, oldCatalog) => {
    if (filterBy == "priceLow") {
      return orderBy(oldCatalog, "price", "asc");
    } else if (filterBy == "priceHight") {
      return orderBy(oldCatalog, "price", "desc");
    } else {
      return oldCatalog;
    }
  };

  search = (searchQuery, catalog) =>
    catalog.filter(
      (item) =>
        item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
        item.section.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0 ||
        item.producer.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
    );

  onPageChange = (pageNumber) => {
    this.props.dispatch(set_current_page(pageNumber));
    this.loadData(pageNumber);
  };

  render() {
    const {
      isReady,
      sortSelectors,
      catalog,
      pageSize,
      totalUserCount,
      currentPage,
    } = this.props.itemsCatalog;
    const { searchQuery, filterBy, section } = this.props.sort;

    let pagesCount = Math.ceil(totalUserCount / pageSize);
    let pagination = [];
    for (let i = 1; i <= pagesCount; i++) {
      pagination.push(
        <span
          className={currentPage === i && "selectPagination"}
          onClick={() => {
            this.onPageChange(i);
          }}
        >
          {i}
        </span>
      );
    }

    var code = !isReady
      ? "Loading..."
      : this.filterCatalog(
          filterBy,
          this.search(searchQuery, catalog)
        ).map((item) => <ItemComponent key={item.id} item={item} />);

    return (
      <Container>
        <Item.Group>
          <Sort activeItem="all" activeSection="all" />
          {pagination}
          {code.length == 0 ? "Ничего не найдено" : code}
        </Item.Group>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  itemsCatalog: state.itemsCatalog,
  sort: state.sort,
});

export default connect(mapStateToProps)(Catalog);
