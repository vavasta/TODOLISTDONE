const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ListSchema = new Schema(
  {
    position: Number,
    message: String,
    sublistId: Number,
    parent: String,
    ancestors: Array
  },
  { collection: "list" }
);

module.exports = mongoose.model("List", ListSchema, "list");
