import React from "react";
import { Menu, Segment, Button, List, Image, Popup } from "semantic-ui-react";
import "./style/HeadMenu.css";
import isoFetch from "isomorphic-fetch";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { logout } from "../redux/actions/usersData";
import { save_last_page, set_current_page } from "../redux/actions/catalog";
import { load_items, add_item } from "../redux/actions/cart";

import { reloadData } from "./events";

class HeadMenu extends React.Component {
  state = { activeItem: "home", isCatalogMenuActive: false };

  componentWillUnmount() {
    
    if (this.props.usersData.activeUser) {
      this.saveUsersCart();
      
    }
  }

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

  render() {
    const { activeItem } = this.state;
    const { isActiveUserAdmin, activeUser } = this.props.usersData;
    const { items, itemsId, isItemsReady, isItemsIdReady } = this.props.cart;

    var catalogMenu = (
      <Segment>
        <div className="catalogMenuContainer">
          <NavLink
            to="/catalog"
            exact
            activeClassName="activate"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("");
            }}
          >
            <b>Все</b>
          </NavLink>
          <NavLink
            to="/catalog/washing"
            activeClassName="activate"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("washing");
            }}
          >
            <b>Стирка</b>
          </NavLink>
          <NavLink
            to="/catalog/cleaning"
            activeClassName="activate"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("cleaning");
            }}
          >
            <b>Уборка</b>
          </NavLink>
          <NavLink
            to="/catalog/sponges"
            activeClassName="activate"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("sponges");
            }}
          >
            <b>Губки</b>
          </NavLink>
          <NavLink
            to="/catalog/napkins"
            activeClassName="activate"
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
                  <Image avatar src={"/delete.png"} className="deleteBut" />
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

    var totalCost = 0
    
    return (
      <div>
        <Menu secondary>
          <Menu.Item
            name="Домой"
            active={activeItem === "Домой"}
            onClick={this.handleItemClick}
          >
            <NavLink to="/" activeClassName="activate" exact>
              Домой
            </NavLink>
          </Menu.Item>

          <Menu.Item
            name="Каталог товаров"
            active={activeItem === "Каталог товаров"}
            onClick={(EO) => {
              this.activateCatalogMenu("Каталог товаров");
            }}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              {isActiveUserAdmin ? (
                <NavLink activeClassName="activate" to="/addItem">
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
                  hideOnScroll
                />
              )}
            </Menu.Item>
            <Menu.Item
              name="Войти"
              active={activeItem === "Войти"}
              onClick={() => {
                this.userData(activeUser, "Войти");
              }}
            >
              {activeUser ? "Выйти" : "Войти"}
            </Menu.Item>
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
