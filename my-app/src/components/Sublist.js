import React from "react";

function SublistForm(props) {
  return (
    <div>
      {props.Sublisttasks.map(task => (
        <div key={task.id}>{task.text}</div>
      ))}
    </div>
  );
}
export default SublistForm;
