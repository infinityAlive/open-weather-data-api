"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dayjs = require("dayjs");

var _dayjs2 = _interopRequireDefault(_dayjs);

var _mongoDbCrud = require("../mongo-db-crud");

var mongodbCrud = _interopRequireWildcard(_mongoDbCrud);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const weatherDataService = {};

weatherDataService.retrieveCityWeather = async cities => {
  let multiCityWeather = await mongodbCrud.find('CityWeather', {
    _id: {
      $in: cities
    }
  });
  const now = (0, _dayjs2.default)();
  const citiesWeatherInfo = [];

  for (let cityWeather of multiCityWeather) {
    let singleCityWeatherInfo = {};

    for (let weatherTimeRangeInfo of cityWeather.timeRange) {
      const startTime = (0, _dayjs2.default)(weatherTimeRangeInfo.startTime);
      const endTime = (0, _dayjs2.default)(weatherTimeRangeInfo.endTime);
      const isNowBeforeTimeRange = now.isBefore(startTime);
      const isNowBetweenTimeRange = startTime.isBefore(now) && endTime.isAfter(now);
      weatherTimeRangeInfo.startTime = (0, _dayjs2.default)(weatherTimeRangeInfo.startTime).format('YYYY/MM/DD HH:mm');
      weatherTimeRangeInfo.endTime = (0, _dayjs2.default)(weatherTimeRangeInfo.endTime).format('YYYY/MM/DD HH:mm');

      if (isNowBeforeTimeRange) {
        singleCityWeatherInfo = weatherTimeRangeInfo;
        break;
      } else if (isNowBetweenTimeRange) {
        singleCityWeatherInfo = weatherTimeRangeInfo;
        break;
      }
    }

    singleCityWeatherInfo['city'] = cityWeather['_id'];
    citiesWeatherInfo.push(singleCityWeatherInfo);
  }

  return citiesWeatherInfo;
};

weatherDataService.retrieveAreaWeather = async cities => {
  return await mongodbCrud.find('AreaWeather', {
    city: {
      $in: cities
    }
  });
};

exports.default = weatherDataService;