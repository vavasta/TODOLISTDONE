import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/"
});

class RequestClass {
  constructor(transport) {
    this.transport = transport;
  }
  getLists() {
    return this.transport.get("getList");
  }
  getData() {
    return this.transport.get("getData");
  }
  getItemsById(id) {
    return this.transport.get(`getData?parent=${id}`);
  }
  putData(position, message, parent) {
    return this.transport.post("putData", {
      position,
      message,
      parent
    });
  }
  deleteData(data) {
    return this.transport.delete("deleteData", data);
  }
  moveUp(_id, position, secondId, secondPosition) {
    return this.transport.post("moveUp", {
      _id,
      position,
      secondId,
      secondPosition
    });
  }
  moveDown(_id, position, secondId, secondPosition) {
    return this.transport.post("moveDown", {
      _id,
      position,
      secondId,
      secondPosition
    });
  }
  addSublist(_id) {
    return this.transport.post("addSublist", {
      _id
    });
  }
  removeSublist(_id) {
    return this.transport.post("removeSublist", {
      _id
    });
  }
}

const requestHttp = new RequestClass(instance);

export { requestHttp };
