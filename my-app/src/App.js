import React from "react";
import "./App.css";
// import List from "./components/List";
import ListContainer from "./containers/listContainer";
import { getListsThunk, getItemsThunk } from "./reducers/reducer";
import { connect } from "react-redux";
class App extends React.Component {
  componentDidMount() {
    this.props.getListsThunk();
    this.props.getItemsThunk();
  }

  render() {
    console.log("PROPS", this.props);
    if (this.props.lists.lists && this.props.lists.items) {
      return (
        <div className="container">
          <h1>TODO LIST</h1>
          <ListContainer listId={this.props.lists.lists[0]._id} />
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>TODO LIST</h1>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};

const mapDispatchToProps = {
  getItemsThunk,
  getListsThunk
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
