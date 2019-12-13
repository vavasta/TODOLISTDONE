import React from "react";
import "./App.css";
import List from "./components/List";
class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>TODO LIST</h1>
        <List />
      </div>
    );
  }
}
export default App;
