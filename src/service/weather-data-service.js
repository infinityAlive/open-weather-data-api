import dayjs from 'dayjs'
import * as mongodbCrud from '../mongo-db-crud'

const weatherDataService = {}
weatherDataService.retrieveCityWeather = async cities => {
  let multiCityWeather = await mongodbCrud.find('CityWeather',
    {
      _id: { $in: cities }
    })

  const now = dayjs()
  const citiesWeatherInfo = []
  for (let cityWeather of multiCityWeather) {
    let singleCityWeatherInfo = {}

    for (let weatherTimeRangeInfo of cityWeather.timeRange) {
      const startTime = dayjs(weatherTimeRangeInfo.startTime)
      const endTime = dayjs(weatherTimeRangeInfo.endTime)
      const isNowBeforeTimeRange = now.isBefore(startTime)
      const isNowBetweenTimeRange = startTime.isBefore(now) && endTime.isAfter(now)

      weatherTimeRangeInfo.startTime = dayjs(weatherTimeRangeInfo.startTime).format('YYYY/MM/DD HH:mm')
      weatherTimeRangeInfo.endTime = dayjs(weatherTimeRangeInfo.endTime).format('YYYY/MM/DD HH:mm')

      if (isNowBeforeTimeRange) {
        singleCityWeatherInfo = weatherTimeRangeInfo
        break
      } else if (isNowBetweenTimeRange) {
        singleCityWeatherInfo = weatherTimeRangeInfo
        break
      }
    }
    singleCityWeatherInfo['city'] = cityWeather['_id']
    citiesWeatherInfo.push(singleCityWeatherInfo)
  }

  return citiesWeatherInfo
}

weatherDataService.retrieveAreaWeather = async cities => {
  return await mongodbCrud.find('AreaWeather',
    {
      city: { $in: cities }
    })
}

export default weatherDataService