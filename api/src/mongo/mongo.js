const { MongoClient } = require("mongodb");
import { db_uri, mongodb } from "../helpers/const.helper";

const mongoSetup = () => {
  MongoClient.connect(
    db_uri,
    { useUnifiedTopology: true },
    function (err, database) {
      if (err) throw err;
      const db = database.db(mongodb);
      global.db = db;
    }
  );
};

module.exports = { mongoSetup };
