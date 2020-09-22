import React from 'react'

class ItemCatalog extends React.PureComponent {
  render(){
    console.log(this.props.info)
    return this.props.info.name
  }

}

export default ItemCatalog