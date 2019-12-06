import React from "react";
import Buttons from "./Buttons";
import Form from "./Form";
import Item from "./Item";
class List extends React.Component {
  state = {
    arr: [],
    input: "",
    inputSublist: "",
    isOpen: true,
    btnIsOpen: true,
    UpBtnOpen: true
  };
  //Random ID
  getRandomID(min, max) {
    var int = Math.floor(Math.random() * (max - min + 1)) + min;

    return int.toString(36);
  }
  //Form on Submit, button on Click
  onSubmit = e => {
    e.preventDefault();
    const Obj = {
      text: this.state.input,
      id: this.getRandomID(0, 1679615)
    };
    const list = this.state.arr.concat([Obj]);
    this.setState({ arr: list });
    this.setState({ input: "" });
  };
  //Input values
  onChangeInput = e => {
    this.setState({ input: e.target.value });
  };
  //Delete Item
  onDelete = idTodelete => {
    const newArr = this.state.arr.filter(item => item.id !== idTodelete);

    this.setState({
      arr: newArr
    });
  };
  //Key UP
  onKeyUp = idToMoveUp => {
    const index = this.state.arr.findIndex(item => item.id === idToMoveUp);
    const element = this.state.arr.find(item => item.id === idToMoveUp);
    const changedarr = this.state.arr;
    if (index > 0) {
      changedarr.splice(index - 1, 2, element, changedarr[index - 1]);
      this.setState({ arr: changedarr });
      this.setState({});
    }
  };
  //Key Down
  onKeyDown = idToMoveDown => {
    const index = this.state.arr.findIndex(item => item.id === idToMoveDown);
    const element = this.state.arr.find(item => item.id === idToMoveDown);
    const changedarr = this.state.arr;
    if (index === changedarr.length - 1) return;
    changedarr.splice(index, 2, changedarr[index + 1], element);
    this.setState({ arr: changedarr });
  };
  render() {
    return (
      <div className="maindiv">
        {this.state.arr.map((task, index) => (
          <Item
            index={index}
            arr={this.state.arr}
            key={task.id}
            task={task}
            buttonsId={task.id}
            onDelete={this.onDelete}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
          />
        ))}
        <Form
          Submit={this.onSubmit}
          ChangeInput={this.onChangeInput}
          value={this.state.input}
        />
      </div>
    );
  }
}
export default List;
