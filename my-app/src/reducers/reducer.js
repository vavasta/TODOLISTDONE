import React, { useEffect } from "react";
import { Provider, connect } from "react-redux";
import List from "../components/List";
import { api, requestHttp } from "../api/api";

const initialState = {
  lists: null,
  items: null
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "get-lists":
      return {
        ...state,
        lists: action.payload
      };
    case "get-items":
      return {
        ...state,
        items: action.payload
      };
    case "add-item":
      return {
        ...state,
        items: state.items.concat(action.payload)
      };
    case "add-sub":
      return {
        ...state,
        lists: state.lists.concat(action.payload)
      };
    case "del-sub":
      return {
        ...state,
        lists: state.lists.filter(
          itm => !itm.ancestors.includes(action.parent)
        ),
        items: state.items.filter(itm => !itm.ancestors.includes(action.parent))
      };
    case "del-item":
      return {
        ...state,
        items: action.payload
      };
    case "move-up": {
      return {
        ...state,
        items: action.payload
      };
    }
    case "move-down": {
      return {
        ...state,
        items: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
// Action Creator

const moveDown = arr => ({ type: "move-down", payload: arr });
const moveUp = arr => ({
  type: "move-up",
  payload: arr
});
const delItem = newarr => ({ type: "del-item", payload: newarr });
const delSub = id => ({ type: "del-sub", parent: id });
const addSub = ressave => ({ type: "add-sub", payload: ressave });
const addItem = data => ({ type: "add-item", payload: data });
const getItems = data => ({ type: "get-items", payload: data });
const getLists = data => ({ type: "get-lists", payload: data });

////////// Redux Thunk! //////////////////

//MOVEDOWNTHUNK
export const moveDownThunk = (idToMoveDown, itemsArr) => async dispatch => {
  const element = itemsArr.find(item => item._id === idToMoveDown);
  const position = element.position;
  const def = position;
  const changePosition = position + 1;
  const second = itemsArr.find(item => item.position === changePosition);

  requestHttp.moveDown(idToMoveDown, changePosition, second._id, position);
  element.position = changePosition;
  second.position = def;
  dispatch(moveDown(itemsArr));
};
//
//
//
//
//
//MOVEUPTHUNK
export const moveUpThunk = (idToMoveUp, itemsArr) => async dispatch => {
  const element = itemsArr.find(item => item._id === idToMoveUp);
  const position = element.position;
  const def = position;
  const changePosition = position - 1;
  const second = itemsArr.find(item => item.position === changePosition);

  requestHttp.moveUp(idToMoveUp, position, second._id, changePosition);
  element.position = changePosition;
  second.position = def;
  dispatch(moveUp(itemsArr));
};
//
//
//
//
//
//DELITEMTHUNK
export const delItemThunk = (idTodelete, arr) => dispatch => {
  let newarr = arr.filter(item => item._id !== idTodelete);
  const positionToDelete = arr.find(obj => obj._id === idTodelete);
  newarr.map(obj => {
    if (obj.position > positionToDelete.position) {
      --obj.position;
    }
  });
  requestHttp.deleteData({ data: { id: idTodelete } });
  dispatch(delItem(newarr));
};
//
//
//
//
//DELSUBTHUNK
export const delSubThunk = id => dispatch => {
  requestHttp.removeSublist(id);
  dispatch(delSub(id));
};
//
//
//
//
//
//ADDSUBTHUNK
export const addSubThunk = idToAddSublist => async dispatch => {
  const res = await requestHttp.addSublist(idToAddSublist);

  const ressave = res.data.save;
  console.log("res", res.data.save);
  dispatch(addSub(ressave));
};
//
//
//
//
//ADDITEMTHUNK
export const addItemThunk = (arr, e, input, listId) => async dispatch => {
  e.preventDefault();
  let currentIds = arr.map(arr => arr.position);
  let idToBeAdded = 0;
  while (currentIds.includes(idToBeAdded)) {
    idToBeAdded++;
  }
  const res = await requestHttp
    .putData(idToBeAdded, input, listId)
    .then(res => {
      dispatch(addItem(res.data));
    });
};
//
//
//
//
//GETITEMSTHUNK
export const getItemsThunk = () => async dispatch => {
  const res = await requestHttp.getData();
  console.log("items_res", res.data.data);
  dispatch(getItems(res.data.data));
};
//
//
//
//GETLISTSTHUNK
export const getListsThunk = () => async dispatch => {
  const res = await requestHttp.getLists();
  // res.data.data.length > 0
  //   ? dispatch(getItemsThunk(res.data.data[0]._id))
  //   : dispatch(getItemsThunk());
  console.log("lists_res", res.data.data);
  dispatch(getLists(res.data.data));
};

export default mainReducer;
