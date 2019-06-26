"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insert = exports.find = exports.findOne = undefined;

var _mongodb = require("mongodb");

var _mongodb2 = _interopRequireDefault(_mongodb);

var _config = require("./config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongoDbUri = _config2.default.mongoDbUri;

const retrieveCwbDb = (() => {
  let mongoClient, cwbDb;
  return async () => {
    if (!mongoClient) {
      mongoClient = await _mongodb2.default.MongoClient.connect(mongoDbUri, {
        useNewUrlParser: true,
        poolSize: 20
      });
    }

    if (!cwbDb) {
      cwbDb = mongoClient.db('cwb');
    }

    return cwbDb;
  };
})();

const findOne = async (collectionName, query) => {
  try {
    const db = await retrieveCwbDb();
    return await db.collection(collectionName).findOne(query);
  } catch (error) {
    console.error(error);
  }
};

const find = async (collectionName, query) => {
  try {
    const db = await retrieveCwbDb();
    return await db.collection(collectionName).find(query).toArray();
  } catch (error) {
    console.error(error);
  }
};

const insert = async (collectionName, document) => {
  try {
    const db = await retrieveCwbDb();
    const insertResult = await db.collection(collectionName).insertOne(document);
    console.log(`Result of insert ${collectionName}, ok = ${insertResult.result.ok}`);
  } catch (error) {
    console.error(error);
  }
};

exports.findOne = findOne;
exports.find = find;
exports.insert = insert;