import React from "react";
// import Buttons from "./Buttons";
import { requestHttp } from "../api/api";
import Form from "./Form";
import Item from "./Item";
import ItemContainer from "../containers/itemContainer";

// import axios from "axios";
class List extends React.Component {
  // //Put Data to DB
  putDataToDB = e => {
    const arr = this.props.lists.items;
    this.props.addItemThunk(arr, e, this.state.input, this.props.listId || "");
    this.setState({ input: "" });
  };

  // //Delete Data from DB
  deleteFromDB = idTodelete => {
    parseInt(idTodelete);

    const arr = this.props.lists.items;
    this.props.delItemThunk(idTodelete, arr);
  };

  //Input values
  state = {
    input: ""
  };
  onChangeInput = e => {
    this.setState({ input: e.target.value });
  };

  // //Key UP
  onKeyUp = idToMoveUp => {
    this.props.moveUpThunk(
      // itemsarr,
      idToMoveUp,
      this.props.lists.items
    );
  };

  //Key DOWN
  onKeyDown = idToMoveDown => {
    this.props.moveDownThunk(idToMoveDown, this.props.lists.items);
  };

  //ADD Sublist
  addSublist = idToAddSublist => {
    this.props.addSubThunk(idToAddSublist, this.props.lists.lists);
  };

  render() {
    const arr = this.props.lists.items;
    this.props.items.sort((a, b) => a.position - b.position);
    return (
      <div className="maindiv">
        {this.props.items.length > 0
          ? this.props.items.map((item, position) => (
              <ItemContainer
                position={position}
                arr={arr}
                key={item._id}
                message={item.message}
                buttonsId={item._id}
                onDelete={this.deleteFromDB}
                onKeyDown={this.onKeyDown}
                onKeyUp={this.onKeyUp}
                addSublist={this.addSublist}
                removeSublist={this.props.delSubThunk}
                Submit={this.putDataToDB}
                ChangeInput={this.onChangeInput}
                sublistArr={this.props.lists}
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

// const mapStateToProps = (state, props) => {};
export default List;
