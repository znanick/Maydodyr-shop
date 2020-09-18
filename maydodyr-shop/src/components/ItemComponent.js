import React from "react";
import { Item } from "semantic-ui-react";
import './style/ItemComponent.css'

class ItemComponent extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <Item>
        <Item.Image size="tiny" src={item.imgUrl} />

        <Item.Content>
          <Item.Header as="a">{item.name}</Item.Header>
          <Item.Meta></Item.Meta>
          <Item.Description>{item.description.substr(0, 130)}</Item.Description>
          <Item.Extra>{item.price + " $"}</Item.Extra>
        </Item.Content>
        <div className="buyBlock">
          <b>{item.price + " $"}</b>
          <img className="cart" src="cart.png" alt={item.name} />
        </div>
      </Item>
    );
  }
}

export default ItemComponent;
