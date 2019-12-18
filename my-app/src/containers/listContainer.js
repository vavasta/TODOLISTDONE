import React from "react";
import List from "../components/List";
import { connect } from "react-redux";
import {
  moveDownThunk,
  moveUpThunk,
  delItemThunk,
  delSubThunk,
  addSubThunk,
  addItemThunk,
  getItemsThunk,
  getListsThunk
} from "../reducers/reducer";

const ListContainer = props => {
  return <List listId={props.listId} {...props} />;
};

const mapStateToProps = (state, props) => {
  // const items = props.lists.items.filter(item => item.parent === props.listId);

  return {
    lists: state.lists,
    items: state.lists.items.filter(item => item.parent === props.listId)
  };
};

const mapDispatchToProps = {
  moveDownThunk,
  moveUpThunk,
  delItemThunk,
  delSubThunk,
  addSubThunk,
  addItemThunk,
  getItemsThunk,
  getListsThunk
};

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
