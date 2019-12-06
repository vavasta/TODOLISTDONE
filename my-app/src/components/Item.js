import React from "react";
import Buttons from "./Buttons";
import List from "./List";

class Item extends React.Component {
  state = {
    isOpen: false,
    UpBtnOpen: false
  };
  //Sublist Functions
  addSublist = idToSublist => {
    this.setState({ isOpen: true });
  };
  removeSublist = idToSublist => {
    this.setState({ isOpen: false });
  };
  //   removeUpBtn = idToSublist => {
  //     if (props.index === 0) {
  //     }
  //   };

  render() {
    return (
      <div>
        {this.props.task.text}
        <Buttons
          index={this.props.index}
          arr={this.props.arr}
          removeUpBtn={this.removeUpBtn}
          hasSublist={this.state.isOpen}
          addSublist={this.addSublist}
          removeSublist={this.removeSublist}
          buttonsId={this.props.task.id}
          onDelete={this.props.onDelete}
          onKeyDown={this.props.onKeyDown}
          onKeyUp={this.props.onKeyUp}
        />
        {this.state.isOpen ? <List /> : ""}
      </div>
    );
  }
}

export default Item;
