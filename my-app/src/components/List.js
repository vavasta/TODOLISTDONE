import React from "react";
import Buttons from "./Buttons";
import { requestHttp } from "../api/api";
import Form from "./Form";
import Item from "./Item";
import axios from "axios";
class List extends React.Component {
  state = {
    arr: [],
    input: "",
    inputSublist: "",
    isOpen: true,
    btnIsOpen: true,
    UpBtnOpen: true,
    sublistAdded: false,
    sublistId: "",
    sublistArr: [],
    itemToAddSublist: ""
  };
  //
  componentDidMount() {
    this.getDataFromDb();
    this.getListsFromDb();
  }

  //Get Data From DB
  getDataFromDb = () => {
    const { listId } = this.props;
    if (listId) {
      requestHttp.getItemsById(listId).then(res => {
        console.log("res", res.data);
        this.setState({ arr: res.data.data });
      });
    } else {
      requestHttp.getData().then(res => {
        console.log("res", res.data);
        this.setState({ arr: res.data.data });
      });
    }
  };
  //Get Lists
  getListsFromDb = () => {
    requestHttp.getLists().then(res => {
      console.log("getListsFromDb: ", res);
      this.setState({ sublistArr: res.data.data });
    });
  };
  //Put Data to DB
  putDataToDB = (e, input) => {
    e.preventDefault();
    let currentIds = this.state.arr.map(arr => arr.position);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    requestHttp
      .putData(idToBeAdded, this.state.input, this.props.listId || "")
      .then(res => {
        this.setState({ arr: [...this.state.arr, res.data] });
        this.setState({ input: "" });
      });
  };
  //Delete Data from DB
  deleteFromDB = idTodelete => {
    parseInt(idTodelete);

    let newarr = this.state.arr.filter(item => item._id !== idTodelete);
    const positionToDelete = this.state.arr.find(obj => obj._id === idTodelete);
    newarr.map(obj => {
      if (obj.position > positionToDelete.position) {
        --obj.position;
      }
    });

    requestHttp.deleteData({ data: { id: idTodelete } }).then(res => {
      this.setState({
        arr: newarr
      });
    });
  };

  //Input values
  onChangeInput = e => {
    this.setState({ input: e.target.value });
  };

  move = (arr, from, to) => {
    const def = arr[from].position;
    arr[from].position = arr[to].position;
    arr[to].position = def;
    return this.setState({ arr: arr });
  };

  //Key UP
  onKeyUp = idToMoveUp => {
    const element = this.state.arr.find(item => item._id === idToMoveUp);

    const position = element.position;
    const changePosition = position - 1;

    const second = this.state.arr.find(item => item.position == changePosition);
    requestHttp.moveUp(idToMoveUp, position, second._id, changePosition);

    this.move(this.state.arr, position, position - 1);
  };
  onKeyDown = idToMoveUp => {
    const element = this.state.arr.find(item => item._id === idToMoveUp);

    const position = element.position;
    const changePosition = position + 1;

    const second = this.state.arr.find(item => item.position == changePosition);
    requestHttp.moveDown(idToMoveUp, changePosition, second._id, position);
    this.move(this.state.arr, position, position + 1);
  };
  addSublist = idToAddSublist => {
    requestHttp.addSublist(idToAddSublist).then(res => {
      this.setState({
        sublistArr: this.state.sublistArr.concat(res.data.save)
      });
    });
  };
  removeSublist = idToRemoveSublist => {
    requestHttp.removeSublist(idToRemoveSublist);
    this.setState({
      arr: this.state.arr.filter(
        item => !item.ancestors.includes(idToRemoveSublist)
      ),
      sublistArr: this.state.sublistArr.filter(
        item => !item.ancestors.includes(idToRemoveSublist)
      )
    });
  };
  render() {
    const items = this.props.listId
      ? this.state.arr.filter(item => item.parent === this.props.listId)
      : this.state.arr.filter(item => item.parent === "");
    items.sort((a, b) => a.position - b.position);

    return (
      <div className="maindiv">
        {items.length > 0
          ? items.map((item, position) => (
              <Item
                position={position}
                arr={this.state.arr}
                key={item._id}
                message={item.message}
                buttonsId={item._id}
                onDelete={this.deleteFromDB}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                addSublist={this.addSublist}
                removeSublist={this.removeSublist}
                Submit={this.putDataToDB}
                ChangeInput={this.onChangeInput}
                value={this.state.input}
                sublistArr={this.state.sublistArr}
              />
            ))
          : null}
        <Form
          Submit={this.putDataToDB}
          ChangeInput={this.onChangeInput}
          value={this.state.input}
        />
      </div>
    );
  }
}
export default List;
