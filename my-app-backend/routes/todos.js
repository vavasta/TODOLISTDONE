const express = require("express");

const router = express.Router();
const List = require("../models/List");
const Items = require("../models/Items");

//Get Data
router.get("/getData", async (req, res) => {
  // const { parent = "" } = req.query;
  const data = await Items.find();

  console.log("data", data);
  res.json({ success: true, data: data });
});
//Get List
router.get("/getList", async (req, res) => {
  const data = await List.find();
  // .then(lists => {
  if (!data.length) {
    List.create({ ancestors: [], parent: null }).then(list => {
      data.push(list);
      res.status(200).json({ success: true, data: data });
    });
  } else {
    res.status(200).json({ success: true, data: data });
  }
  // });

  // res.json({ success: true, data: data });
});
//Put Data
router.post("/putData", async (req, res) => {
  let data = new Items();
  const { position, message, parent } = req.body;
  data.parent = parent;
  data.message = message;
  data.position = position;
  if (parent) {
    const items = await List.find({ _id: parent });
    data.ancestors = [...items[0].ancestors, parent];
  }
  data.save((err, item) => {
    if (err) return res.json({ success: false, error: err });
    return res.json(item);
  });
});
//Delete Data
router.delete("/deleteData", async (req, res) => {
  const { id } = req.body;
  await List.deleteMany({ ancestors: id });
  await Items.deleteMany({ ancestors: id });
  const item = await Items.find({ _id: id });
  // console.log("item", item);
  const parent = item[0].parent;
  // console.log("parent", parent);
  const siblings = await Items.find({ parent: parent });
  console.log("sib", siblings);
  siblings
    .filter(items => items.position > item[0].position)
    .forEach(item => {
      --item.position;
      item.save();
    });
  await Items.findByIdAndRemove(id, err => {
    if (err) return res.send(err);
    return res.json({ id });
  });
  const allItems = await Items.find();
  if (allItems.length < 1) {
    await List.collection.drop();
  }
});
//Move Up Key
router.post("/moveUp", async (req, res) => {
  const { _id, position, secondId, secondPosition } = req.body;
  const item = await Items.findByIdAndUpdate(_id);

  item.position = secondPosition;
  item.save();
  const elem = await Items.findByIdAndUpdate(secondId);
  elem.position = position;
  elem.save();
  return res.json({ success: true });
});
//Move Down Key
router.post("/moveDown", async (req, res) => {
  const { _id, position, secondId, secondPosition } = req.body;
  const item = await Items.findByIdAndUpdate(_id);
  item.position = position;
  item.save();
  const elem = await Items.findByIdAndUpdate(secondId);
  elem.position = secondPosition;
  elem.save();
  return res.json({ success: true });
});
//Add Sublist
router.post("/addSublist", async (req, res) => {
  const { _id } = req.body;
  const items = await Items.findById(_id);
  try {
    const newList = new List({
      parent: _id,
      ancestors: [...items.ancestors, _id]
    });
    const save = await newList.save();
    return res.json({ save });
  } catch (err) {
    res.send();
  }
});
//Remove Sublist
router.post("/removeSublist", async (req, res) => {
  const { _id } = req.body;
  try {
    await List.findByIdAndRemove(_id);
    await List.deleteMany({ ancestors: _id });
    await Items.deleteMany({ ancestors: _id });
  } catch (e) {
    res.json(e);
  }
});
module.exports = router;
