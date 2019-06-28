"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkToken = exports.logout = exports.login = exports.register = undefined;

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _loginService = require("../service/login-service");

var _loginService2 = _interopRequireDefault(_loginService);

var _messages = require("../common/messages");

var _config = require("../config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const register = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const account = request.body.account;
      const password = request.body.password;
      const loginMessage = await _loginService2.default.register(account, password);
      response.status(_messages.HttpStatus.OK_200).send(loginMessage);
    }
  });
};

const login = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const account = request.body.account;
      const password = request.body.password;
      const loginMessage = await _loginService2.default.retrieve(account, password);
      /* JWT */

      const token = _jsonwebtoken2.default.sign({
        account: account
      }, _config2.default.secret, {
        expiresIn: 60 * 60
      });

      if (loginMessage.indexOf('failed') >= 0) {
        response.status(_messages.HttpStatus.UNAUTHORIZED_401).send(loginMessage);
      } else {
        response.status(_messages.HttpStatus.OK_200).send({
          loginMessage: loginMessage,
          token: token
        });
      }
    }
  });
};

const logout = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      response.status(_messages.HttpStatus.OK_200).send(_messages.LoginInfo.LOGOUT_SUCCESS);
    }
  });
};

const checkToken = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const token = request.body.token;

      if (token) {
        _jsonwebtoken2.default.verify(token, _config2.default.secret, (error, decode) => {
          if (error) {
            response.status(_messages.HttpStatus.UNAUTHORIZED_401).send(_messages.LoginInfo.TOKEN_IS_ERROR);
          } else {
            console.log(`Decode, account is = ${decode.account}`);
            response.status(_messages.HttpStatus.OK_200).send(decode.account);
          }
        });
      } else {
        response.status(_messages.HttpStatus.UNAUTHORIZED_401).send(_messages.LoginInfo.TOKEN_IS_ERROR);
      }
    }
  });
};

exports.register = register;
exports.login = login;
exports.logout = logout;
exports.checkToken = checkToken;