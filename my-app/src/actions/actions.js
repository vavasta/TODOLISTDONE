export const addItem = (message, parent, ancestors) => {
  return {
    type: "add-item",
    message,
    parent,
    ancestors
  };
};
