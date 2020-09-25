import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./style/itemInfo.css";

import { add_item } from "../redux/actions/cart";

class ItemInfo extends React.PureComponent {
  addToCart = (itemId) => {
    if (this.props.usersData.activeUser) {
      var newItemsId = [...this.props.cart.itemsId];
      newItemsId.push(itemId);
      this.props.dispatch(add_item(newItemsId));
    } else {
      this.props.history.push("/login");
    }
  };
  render() {
    const { info } = this.props;
    return (
      <div className="itemInfoContainer">
        <h1 className="name">{info.name}</h1>
        <div className="leftContainer">
          <img className="itemsImg" src={info.imgUrl} alt={info.name}></img>
        </div>
        <div className="rightContainer">
          <p className="description">{info.description}</p>

          <button
            className="button"
            onClick={() => {
              this.addToCart(info.id);
            }}
          >
            {" "}
            {"Купить  " + info.price + "$"}{" "}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usersData: state.usersData,
  cart: state.cart,
});

export default connect(mapStateToProps)(withRouter(ItemInfo));
