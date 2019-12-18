import React from "react";
import Buttons from "./Buttons";
import List from "./List";
import ListContainer from "../containers/listContainer";

class Item extends React.Component {
  state = {
    isOpen: true,
    UpBtnOpen: false,
    sublistMessage: ""
  };

  //Sublist Functions
  addSublist = idToSublist => {
    this.props.addSublist(idToSublist);
    this.setState({ isOpen: false });
    this.changeBTNstatus();
  };
  removeSublist = idToSublist => {
    this.props.removeSublist(idToSublist);
    this.setState({ isOpen: false });
  };

  changeBTNstatus = idToSublist => {};

  render() {
    return (
      <div>
        {this.props.message}
        <Buttons
          filteredItems={this.props.filteredItems}
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
        {this.props.filteredItems.length ? (
          <ListContainer
            arr={this.props.arr}
            listId={this.props.filteredItems[0]._id}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Item;
