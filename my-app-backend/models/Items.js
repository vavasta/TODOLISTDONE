const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemsSchema = new Schema(
  {
    position: Number,
    message: String,
    sublistId: Number,
    parent: String,
    ancestors: Array
  },
  { collection: "items" }
);

module.exports = mongoose.model("Items", ItemsSchema, "items");
