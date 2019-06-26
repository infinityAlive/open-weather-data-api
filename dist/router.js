"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loginHandler = require("./api/loginHandler");

var loginApi = _interopRequireWildcard(_loginHandler);

var _weather = require("./api/weather");

var weatherApi = _interopRequireWildcard(_weather);

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

// import router from './server'
const router = _express2.default.Router();

router.post('/login', loginApi.login);
router.post('/logout', loginApi.logout);
router.post('/register', loginApi.register);
router.post('/checkToken', loginApi.checkToken);
router.get('/weather/cities', weatherApi.retrieveCitiesWeatherInfo);
router.get('/weather/areas', weatherApi.retrieveAreasWeatherInfo);
exports.default = router;