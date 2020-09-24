import React from "react";
import isoFetch from "isomorphic-fetch";
import { Container, Item } from "semantic-ui-react";
import { reloadData } from "./events";

import "./style/Catalog.css";

import { connect } from "react-redux";

import {
  set_catalog,
  set_current_page,
  set_length,
} from "../redux/actions/catalog";

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
    reloadData.addListener("reloadData", this.loadData);
  }

  componentWillUnmount() {
    console.log("");
    window.removeEventListener(
      "popstate",
      this.loadData,
      false
    );
    reloadData.removeListener("reloadData", this.loadData);
  }

  

  loadData = (
    filterBy = this.props.sort.filterBy,
    searchQuery = this.props.sort.searchQuery,
    pageNumber = this.props.itemsCatalog.currentPage,
    section = this.props.sort.section
  ) => {
    let newSection = section
      ? "section=" + section
      : "";

    var filter = "";
    if (filterBy !== "all") {
      if (filterBy === "priceHight") {
        filter = "_sort=price&_order=desc";
      } else if (filterBy === "priceLow") {
        filter = "_sort=price&_order=asc";
      }
    }
    var search = searchQuery ? searchQuery : "";
    this.dataRequest(newSection, search, filter, pageNumber);
    this.dataLengthRequest(newSection, search);
  };

  fetchError = (errorMessage) => {
    console.error(errorMessage);
  };
  dataRequest = (section, search, filter, pageNumber) => {
    isoFetch(
      `http://localhost:3004/itemCatalog?${section}&name_like=${search}&${filter}&_page=${pageNumber}&_limit=${this.props.itemsCatalog.pageSize}`,
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
  dataLengthRequest = (section, search) => {
    isoFetch(
      `http://localhost:3004/itemCatalog?${section}&name_like=${search}`,
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
        this.props.dispatch(set_length(data.length));
      })
      .catch((error) => {
        this.fetchError(error.message);
      });
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
    this.loadData(
      this.props.sort.filterBy,
      this.props.sort.searchQuery,
      pageNumber
    );
  };

  render() {
    const {
      isReady,

      catalog,
      pageSize,
      totalUserCount,
      currentPage,
      totalUserCountIsReady,
    } = this.props.itemsCatalog;

    let pagesCount = Math.ceil(totalUserCount / pageSize);
    let pagination = [];
    for (let i = 1; i <= pagesCount; i++) {
      pagination.push(
        <span
          key={i}
          className={currentPage === i ? "selectPagination" : undefined}
          onClick={() => {
            this.onPageChange(i);
          }}
        >
          {i}
        </span>
      );
    }

    var code =
      !isReady && !totalUserCountIsReady
        ? "Loading..."
        : catalog.map((item) => <ItemComponent key={item.id} item={item} />);

    return (
      <Container>
        <Item.Group>
          <Sort
            activeItem="all"
            activeSection="all"
            cbLoadData={this.loadData}
          />
          {pagination}
          {code.length === 0 ? "Ничего не найдено" : code}
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
