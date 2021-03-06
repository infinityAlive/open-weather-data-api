"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _xorCrypt = require("xor-crypt");

var _xorCrypt2 = _interopRequireDefault(_xorCrypt);

var _mongoDbCrud = require("../mongo-db-crud");

var mongodbCrud = _interopRequireWildcard(_mongoDbCrud);

var _messages = require("../common/messages");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const loginService = {};

loginService.retrieve = async (account, password) => {
  try {
    const loginInfo = await mongodbCrud.findOne('LoginInfo', {
      _id: account
    });

    if (loginInfo) {
      const decryptedPwd = (0, _xorCrypt2.default)(loginInfo.password);

      if (decryptedPwd === password) {
        return _messages.LoginInfo.LOGIN_SUCCESS;
      } else {
        return _messages.LoginInfo.LOGIN_PWD_DIFF;
      }
    } else {
      return _messages.LoginInfo.LOGIN_ACCOUNT_IS_EMPTY;
    }
  } catch (error) {
    console.error(error);
    return _messages.LoginInfo.LOGIN_FAILED;
  }
};

loginService.register = async (account, password) => {
  const loginInfo = await mongodbCrud.findOne('LoginInfo', {
    _id: account
  });

  if (loginInfo && Object.keys(loginInfo).length > 0) {
    return _messages.LoginInfo.REGISTER_ACCOUNT_IS_EXISTED;
  }

  try {
    await mongodbCrud.insert('LoginInfo', {
      _id: account,
      password: (0, _xorCrypt2.default)(password)
    });
    return _messages.LoginInfo.REGISTER_SUCCESS;
  } catch (error) {
    console.error(error);
    return _messages.LoginInfo.REGISTER_FAILED;
  }
};

exports.default = loginService;