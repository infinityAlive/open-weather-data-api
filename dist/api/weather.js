"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retrieveAreasWeatherInfo = exports.retrieveCitiesWeatherInfo = undefined;

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _weatherDataService = require("../service/weather-data-service");

var _weatherDataService2 = _interopRequireDefault(_weatherDataService);

var _messages = require("../common/messages");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const retrieveCitiesWeatherInfo = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'GET') {
      let cities;

      if (request.query.hasOwnProperty('city')) {
        cities = request.query.cties;
      } else {
        cities = ['臺北市', '新北市', '桃園市'];
      }

      try {
        const citiesWeatherInfo = await _weatherDataService2.default.retrieveCityWeather(cities);
        response.status(_messages.HttpStatus.OK_200).send(citiesWeatherInfo);
      } catch (error) {
        console.error(error);
        response.sendStatus(_messages.HttpStatus.SERVER_ERROR_500);
      }
    } else {
      response.sendStatus(_messages.HttpStatus.BAD_REQUEST_400);
    }
  });
};

const retrieveAreasWeatherInfo = (request, response) => {
  let corsFn = (0, _cors2.default)();
  corsFn(request, response, async () => {
    if (request.method === 'GET') {
      let cities = [];

      if (request.query.hasOwnProperty('city')) {
        cities = request.query.cties;
      } else {
        cities = ['臺北市', '新北市', '桃園市'];
      }

      try {
        const areasWeatherInfo = await _weatherDataService2.default.retrieveAreaWeather(cities);
        response.status(_messages.HttpStatus.OK_200).send(areasWeatherInfo);
      } catch (error) {
        console.error(error);
        response.sendStatus(_messages.HttpStatus.SERVER_ERROR_500);
      }
    } else {
      response.sendStatus(_messages.HttpStatus.BAD_REQUEST_400);
    }
  });
};

exports.retrieveCitiesWeatherInfo = retrieveCitiesWeatherInfo;
exports.retrieveAreasWeatherInfo = retrieveAreasWeatherInfo;