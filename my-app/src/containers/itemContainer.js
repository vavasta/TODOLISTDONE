import React from "react";
import { connect } from "react-redux";
import Item from "../components/Item";

const ItemContainer = props => {
  //   console.log("SUBLIST", this.props.sublistArr);
  return <Item {...props} />;
};

const mapStateToProps = (state, props) => {
  console.log("SUBLIST", props);
  return {
    filteredItems: state.lists.lists.filter(
      item => item.parent === props.buttonsId
    )
  };
};
export default connect(mapStateToProps)(ItemContainer);
