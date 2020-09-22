import React from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import "./style/HeadMenu.css";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { logout } from "../redux/actions/usersData";
import { save_last_page } from "../redux/actions/catalog";
import { set_section } from "../redux/actions/sort";
import isoFetch from "isomorphic-fetch";
import { set_catalog, add_item } from "../redux/actions/catalog";

class HeadMenu extends React.Component {
  state = { activeItem: "home", isCatalogMenuActive: false };

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
    isoFetch(`http://localhost:3004/itemCatalog?${section}`, {
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

  fetchError = (errorMessage) => {
    console.error(errorMessage);
  };

  render() {
    const { activeItem } = this.state;
    var catalogMenu = (
      <Segment>
        <div className="catalogMenuContainer">
          <NavLink
            to="/catalog"
            exact
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("");
            }}
          >
            <b>Все</b>
          </NavLink>
          <NavLink
            to="/catalog/washing"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("section=washing");
            }}
          >
            <b>Стирка</b>
          </NavLink>
          <NavLink
            to="/catalog/cleaning"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("section=cleaning");
            }}
          >
            <b>Уборка</b>
          </NavLink>
          <NavLink
            to="/catalog/sponges"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("section=sponges");
            }}
          >
            <b>Губки</b>
          </NavLink>
          <NavLink
            to="/catalog/napkins"
            className="catalogMenuItem"
            onClick={() => {
              this.reloadData("section=napkins");
            }}
          >
            <b>Тряпки</b>
          </NavLink>
        </div>
      </Segment>
    );

    const { activeUserId } = this.props.usersData;
    return (
      <div>
        <Menu secondary>
          <Menu.Item
            name="Домой"
            active={activeItem === "Домой"}
            onClick={this.handleItemClick}
          >
            <NavLink to="/" exact>
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
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
            <Menu.Item
              name="Войти"
              active={activeItem === "Войти"}
              onClick={() => {
                this.userData(activeUserId, "Войти");
              }}
            >
              {activeUserId ? "Выйти" : "Войти"}
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
});

export default connect(mapStateToProps)(withRouter(HeadMenu));
