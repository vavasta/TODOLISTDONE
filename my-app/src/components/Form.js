import React from "react";

function Form(props) {
  return (
    <form>
      <input
        className="Form"
        onChange={props.ChangeInput}
        value={props.value}
      />
      <button
        className="btn-floating btn-large waves-effect waves-light red"
        onClick={props.Submit}
      >
        ADD
      </button>
    </form>
  );
}
export default Form;
