import React from "react";
import isoFetch from "isomorphic-fetch";
import { Container, Card, Item, Image } from "semantic-ui-react";
import orderBy from "lodash/orderBy";

import { connect } from "react-redux";

import { set_catalog, add_item } from "../redux/actions/catalog";

import ItemComponent from "./ItemComponent";
import Sort from "./Sort";

class App extends React.PureComponent {
  componentDidMount() {
    this.loadData();
  }

  fetchError = (errorMessage) => {
    console.error(errorMessage);
  };

  loadData = () => {
    isoFetch("storeCatalog.json", {
      method: "get",
      headers: {
        Accept: "application/json",
      },
    })
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

  itemsOfThisSection = (section, oldCatalog) => {
    
    if (!section) {
      return oldCatalog;
    } else {
      return oldCatalog.filter((item) => item.section == section);
    }
    
  };

  render() {
    const { isReady, sortSelectors, catalog } = this.props.itemsCatalog;
    const { searchQuery, filterBy } = this.props.sort;

    

    var code = !isReady
      ? "Loading..."
      : this.filterCatalog(
          filterBy,
          this.search(
            searchQuery,
            this.itemsOfThisSection(this.props.match.params.section, catalog)
          )
        ).map((item) => <ItemComponent key={item.id} item={item} />);

    return (
      <Container>
        <Item.Group>
          <Sort activeItem="all" activeSection="all" />
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

export default connect(mapStateToProps)(App);
