"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _router = require("./router");

var _router2 = _interopRequireDefault(_router);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const app = (0, _express2.default)();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log(`listening at host(${host}), port(${port})`);
});
app.use((0, _cors2.default)());
app.options('*', (0, _cors2.default)());
app.use(_bodyParser2.default.urlencoded({
  extended: false
}));
app.use(_bodyParser2.default.json());
app.use('/api', _router2.default);