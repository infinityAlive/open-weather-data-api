import cors from 'cors'
import weatherDataService from '../service/weather-data-service'
import { HttpStatus } from '../common/messages'

const retrieveCitiesWeatherInfo = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'GET') {
      let cities
      if (request.query.hasOwnProperty('city')) {
        cities = request.query.cties
      } else {
        cities = ['臺北市', '新北市', '桃園市']
      }

      try {
        const citiesWeatherInfo = await weatherDataService.retrieveCityWeather(cities)
        response.status(HttpStatus.OK_200).send(citiesWeatherInfo)
      } catch (error) {
        console.error(error)
        response.sendStatus(HttpStatus.SERVER_ERROR_500)
      }
    } else {
      response.sendStatus(HttpStatus.BAD_REQUEST_400)
    }
  })
}

const retrieveAreasWeatherInfo = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'GET') {
      let cities = []
      if (request.query.hasOwnProperty('city')) {
        cities = request.query.cties
      } else {
        cities = ['臺北市', '新北市', '桃園市']
      }

      try {
        const areasWeatherInfo = await weatherDataService.retrieveAreaWeather(cities)
        response.status(HttpStatus.OK_200).send(areasWeatherInfo)
      } catch (error) {
        console.error(error)
        response.sendStatus(HttpStatus.SERVER_ERROR_500)
      }
    } else {
      response.sendStatus(HttpStatus.BAD_REQUEST_400)
    }
  })
}

export { retrieveCitiesWeatherInfo, retrieveAreasWeatherInfo }
