import React from "react";

function Buttons(props) {
  console.log("Buttons props", props);
  return (
    <div>
      <button
        className="waves-effect waves-light btn-small"
        onClick={() => props.onDelete(props.buttonsId)}
      >
        DELETE
        <i className="large material-icons">delete_forever</i>
      </button>
      {props.position > 0 && (
        <button
          className="waves-effect waves-light btn-small"
          onClick={() => props.onKeyUp(props.buttonsId)}
        >
          UP
          <i className="large material-icons">arrow_upward</i>
        </button>
      )}
      {props.position !== props.arr.length - 1 && (
        <button
          className="waves-effect waves-light btn-small"
          onClick={() => props.onKeyDown(props.buttonsId)}
        >
          DOWN
          <i className="large material-icons">arrow_downward</i>
        </button>
      )}
      {!props.filteredItems.length - 1 ? (
        <button
          className="waves-effect waves-light btn-small"
          onClick={() => props.removeSublist(props.buttonsId)}
        >
          REMOVE SUBLIST
        </button>
      ) : (
        <button
          className="waves-effect waves-light btn-small"
          onClick={() => props.addSublist(props.buttonsId)}
        >
          ADD SUBLIST
        </button>
      )}
    </div>
  );
}
export default Buttons;
