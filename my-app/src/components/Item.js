import React from "react";
import Buttons from "./Buttons";
import List from "./List";

class Item extends React.Component {
  state = {
    isOpen: false,
    UpBtnOpen: false,
    sublistMessage: ""
  };

  //Sublist Functions
  addSublist = idToSublist => {
    this.props.addSublist(idToSublist);
    this.setState({ isOpen: true });
    this.changeBTNstatus();
  };
  removeSublist = idToSublist => {
    this.props.removeSublist(idToSublist);
    this.setState({ isOpen: false });
  };

  changeBTNstatus = idToSublist => {};

  render() {
    const idToSublist = this.props.buttonsId;
    const filteredItems = this.props.sublistArr.filter(
      item => item.parent == idToSublist
    );
    return (
      <div>
        {this.props.message}
        <Buttons
          filteredItems={filteredItems}
          position={this.props.position}
          arr={this.props.arr}
          removeUpBtn={this.removeUpBtn}
          hasSublist={this.state.isOpen}
          addSublist={this.addSublist}
          removeSublist={this.removeSublist}
          buttonsId={this.props.buttonsId}
          onDelete={this.props.onDelete}
          onKeyDown={this.props.onKeyDown}
          onKeyUp={this.props.onKeyUp}
        />
        {filteredItems.length ? <List listId={filteredItems[0]._id} /> : ""}
      </div>
    );
  }
}

export default Item;
