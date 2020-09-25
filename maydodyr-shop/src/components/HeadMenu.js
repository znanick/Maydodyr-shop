import React from "react";
import { Menu, Segment, List, Image, Popup } from "semantic-ui-react";

import "./style/HeadMenu.css";
import isoFetch from "isomorphic-fetch";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { logout } from "../redux/actions/usersData";
import { save_last_page, set_current_page } from "../redux/actions/catalog";
import { load_items, remove_item, add_item } from "../redux/actions/cart";

import { reloadData, addToCart } from "./events";

class HeadMenu extends React.Component {
  state = { activeItem: "home", isCatalogMenuActive: false };

  componentDidMount() {
    addToCart.addListener("addToCart", this.addToCart);
  }

  componentWillUnmount() {
    if (this.props.usersData.activeUser) {
      this.saveUsersCart();
    }
    addToCart.removeListener("addToCart", this.addToCart);
  }

  addToCart = (itemId) => {
    if (this.props.usersData.isActiveUserAdmin) {
      alert("Вы администратор!");
    } else if (this.props.usersData.activeUser) {
      var newItemsId = [...this.props.cart.itemsId];
      newItemsId.push(itemId);
      this.props.dispatch(add_item(newItemsId));
    } else {
      this.props.history.push("/login");
    }
  };

  saveUsersCart = () => {
    var newData = {
      ...this.props.usersData.activeUser,
      cart: this.props.cart.itemsId,
    };
    isoFetch(
      `http://localhost:3004/usersData/${this.props.usersData.activeUser.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
  };

  handleItemClick = (e, { name }) =>
    this.setState({ activeItem: name, isCatalogMenuActive: false });

  activateCatalogMenu = (name) => {
    this.setState({
      activeItem: name,
      isCatalogMenuActive: !this.state.isCatalogMenuActive,
    });
  };

  userData = (isUserLogin, name) => {
    if (isUserLogin) {
      this.saveUsersCart();
      this.props.dispatch(logout());
    } else if (!isUserLogin) {
      this.props.dispatch(save_last_page(this.props.location.pathname));
      this.setState({
        activeItem: name,
      });
      this.props.history.push("/login");
    }
  };

  reloadData = (section) => {
    this.props.dispatch(set_current_page(1));
    reloadData.emit(
      "reloadData",
      this.props.sort.filterBy,
      this.props.sort.searchQuery,
      this.props.itemsCatalog.currentPage,
      section
    );
  };

  fetchError = (errorMessage) => {
    console.error(errorMessage);
  };

  loadCartsItems = (id) => {
    if (id.length) {
      var result = id.reduce(function (res, id) {
        return res + `&id=${id}`;
      }, "");
      this.cartRequest(result);
    }
  };
  cartRequest = (result) => {
    isoFetch(`http://localhost:3004/itemCatalog?${result}`, {
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
        this.props.dispatch(load_items(data));
      })
      .catch((error) => {
        this.fetchError(error.message);
      });
  };

  deleteItemFromCart = (itemId) => {
    console.log(itemId);
    this.props.dispatch(remove_item(itemId));
  };

  render() {
    const { isActiveUserAdmin, activeUser } = this.props.usersData;
    const { items, itemsId, isItemsReady, isItemsIdReady } = this.props.cart;

    var catalogMenu = (
      <Segment>
        <div className="catalogMenuContainer">
          <NavLink
            to="/catalog"
            exact
            activeClassName="activateCatalogMenuItem"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("");
            }}
          >
            <b>Все</b>
          </NavLink>
          <NavLink
            to="/catalog/washing"
            activeClassName="activateCatalogMenuItem"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("washing");
            }}
          >
            <b>Стирка</b>
          </NavLink>
          <NavLink
            to="/catalog/cleaning"
            activeClassName="activateCatalogMenuItem"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("cleaning");
            }}
          >
            <b>Уборка</b>
          </NavLink>
          <NavLink
            to="/catalog/sponges"
            activeClassName="activateCatalogMenuItem"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("sponges");
            }}
          >
            <b>Губки</b>
          </NavLink>
          <NavLink
            to="/catalog/napkins"
            activeClassName="activateCatalogMenuItem"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("napkins");
            }}
          >
            <b>Тряпки</b>
          </NavLink>
        </div>
      </Segment>
    );
    var cartCode;
    if (isItemsReady && isItemsIdReady) {
      cartCode = items.length
        ? items.map((item) => (
            <List selection divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="right">
                  <Image
                    avatar
                    src={"/delete.png"}
                    className="deleteBut"
                    onClick={() => {
                      this.deleteItemFromCart(item.id);
                    }}
                  />
                </List.Content>
                <Image avatar src={item.imgUrl} />
                <List.Content>{item.name}</List.Content>
              </List.Item>
            </List>
          ))
        : "Корзина пуста";
    } else {
      cartCode = "Загрузка..";
    }

    return (
      <div>
        <Menu secondary>
          <NavLink
            to="/"
            className="headMenuItem"
            activeClassName="activate"
            exact
          >
            Домой
          </NavLink>

          <div
            onClick={(EO) => {
              this.activateCatalogMenu("Каталог товаров");
            }}
            className={
              window.location.pathname === "/catalog" ||
              window.location.pathname === "/catalog/washing" ||
              window.location.pathname === "/catalog/cleaning" ||
              window.location.pathname === "/catalog/sponges" ||
              window.location.pathname === "/catalog/napkins"
                ? "activate"
                : "headMenuItem"
            }
          >
            Каталог товаров
          </div>

          <Menu.Menu position="right">
            <div className="headMenuItem">
              {isActiveUserAdmin ? (
                <NavLink
                  activeClassName="activate"
                  className="headMenuItem"
                  to="/addItem"
                >
                  Добавить товар
                </NavLink>
              ) : (
                <Popup
                  trigger={
                    <Menu.Item
                      name="help"
                      onClick={() => {
                        this.loadCartsItems(itemsId);
                      }}
                    >
                      Корзина
                    </Menu.Item>
                  }
                  content={cartCode}
                  on="click"
                />
              )}
            </div>

            <p
              onClick={() => {
                this.userData(activeUser, "Войти");
              }}
              className={
                window.location.pathname === "/login"
                  ? "activate"
                  : "headMenuItem"
              }
            >
              {activeUser ? "Выйти" : "Войти"}
            </p>
          </Menu.Menu>
        </Menu>
        {this.state.isCatalogMenuActive && catalogMenu}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usersData: state.usersData,
  itemsCatalog: state.itemsCatalog,
  sort: state.sort,
  cart: state.cart,
});

export default connect(mapStateToProps)(withRouter(HeadMenu));
