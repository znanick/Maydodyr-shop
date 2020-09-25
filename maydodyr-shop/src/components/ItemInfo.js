import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import "./style/itemInfo.css";


import {  addToCart } from "./events";

class ItemInfo extends React.PureComponent {
  
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
              addToCart.emit(
                "addToCart",
                info.id
              );
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
