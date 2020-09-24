import React from "react";
import { Item } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import "./style/ItemComponent.css";
import { connect } from "react-redux";

import { add_item } from "../redux/actions/cart";

class ItemComponent extends React.PureComponent {
  addToCart = (itemId) => {
    var newItemsId = [...this.props.cart.itemsId];
    newItemsId.push(itemId);
    this.props.dispatch(add_item(newItemsId));
  };

  render() {
    const { item } = this.props;
    return (
      <div className="itemComponent">
        <NavLink to={"/catalog/item/" + item.id} exact className="itemBlock">
          <img className="itemComponentImg" src={item.imgUrl} alt={item.name} />

          <div className="infoBlock">
            <h2 as="a">{item.name}</h2>
            <Item.Meta></Item.Meta>
            <p>{item.description.substr(0, 130) + "..."}</p>
            <Item.Extra>{item.producer}</Item.Extra>
          </div>
        </NavLink>
        <div className="buyBlock">
          <b>{item.price + " $"}</b>
          <img
            className="cart"
            src="/cart.png"
            alt={item.name}
            onClick={() => {
              this.addToCart(item.id);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps)(ItemComponent);
