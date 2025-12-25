const { v4 } = require("uuid");
const { ObjectId } = require("mongodb");
const { getUser } = require("../helpers/auth.helper");

const apiApp = async (req, res) => {
  try {
    const payload = req.body;
    const collection = payload["collection"];
    const action = payload["action"];
    const data = payload["data"];
    const params = payload["params"] || [];
    const order_by = { created_at: -1 };
    const user = getUser(req);

    if (params["_id"]) {
      params["_id"] = ObjectId(params["_id"]);
    }
    if (action == "create") {
      data["created_by"] = user.id;
      data["created_at"] = new Date().toISOString();
      data["updated_at"] = new Date().toISOString();
      const result = await global.db.collection(collection).insertOne(data);
      return res.status(200).send(data);
    }
    if (action == "get") {
      const result = await global.db
        .collection(collection)
        .find(params)
        .sort(order_by)
        .toArray();
      return res.status(200).send({ count: result?.length || 0, data: result });
    }
    if (action == "aggregate") {
      const result = await global.db
        .collection(collection)
        .aggregate(params)
        .sort(order_by)
        .toArray();
      return res.status(200).send({ count: result?.length || 0, data: result });
    }
    if (action == "update") {
      const result = await db
        .collection(collection)
        .updateMany(params, { $set: data }, {});
      return res.status(200).send({});
    }
    if (action == "delete") {
      const result = await global.db.collection(collection).deleteMany(params);
      return res.status(200).send(result);
    }
    return res.status(200).send({});
  } catch (error) {
    return res.status(400).send({ error });
  }
};
module.exports = { apiApp };
