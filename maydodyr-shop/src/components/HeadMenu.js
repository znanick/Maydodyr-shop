import React from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import "./style/HeadMenu.css";
import { NavLink } from "react-router-dom";

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

  render() {
    const { activeItem } = this.state;
    var catalogMenu = (
      <Segment>
        <div className="catalogMenuContainer">
          <NavLink to="/catalog" exact className="catalogMenuItem">
            <b>Все</b>
          </NavLink>
          <NavLink to="/catalog/washing" className="catalogMenuItem">
            <b>Стирка</b>
          </NavLink>
          <NavLink to="/catalog/cleaning" className="catalogMenuItem">
            <b>Уборка</b>
          </NavLink>
          <NavLink to="/catalog/sponges" className="catalogMenuItem">
            <b>Губки</b>
          </NavLink>
          <NavLink to="/catalog/napkins" className="catalogMenuItem">
            <b>Тряпки</b>
          </NavLink>
        </div>
      </Segment>
    );

    return (
      <div>
        <Menu secondary>
          <Menu.Item
            name="Домой"
            active={activeItem === "Домой"}
            onClick={this.handleItemClick}
          >
            <NavLink to="/" exact>Домой</NavLink>
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
              name="logout"
              active={activeItem === "logout"}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>
        </Menu>
        {this.state.isCatalogMenuActive && catalogMenu}
      </div>
    );
  }
}

export default HeadMenu;
