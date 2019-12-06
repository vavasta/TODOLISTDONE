import React from "react";

function Buttons(props) {
  return (
    <div>
      <button onClick={() => props.onDelete(props.buttonsId)}>CLOSE</button>
      {props.index > 0 && (
        <button onClick={() => props.onKeyUp(props.buttonsId)}>UP</button>
      )}
      {props.index !== props.arr.length - 1 && (
        <button onClick={() => props.onKeyDown(props.buttonsId)}>DOWN</button>
      )}
      {props.hasSublist ? (
        <button onClick={() => props.removeSublist(props.buttonsId)}>
          REMOVE SUBLIST
        </button>
      ) : (
        <button onClick={() => props.addSublist(props.buttonsId)}>
          ADD SUBLIST
        </button>
      )}
    </div>
  );
}
export default Buttons;

//  style={{ backgroundColor: "#BC5D58" }}
//           onClick={() => this.delete(item.key)}
//           key={item.key}
