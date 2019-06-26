// import router from './server'
import * as loginApi from './api/loginHandler'
import * as weatherApi from './api/weather'
import express from 'express'

const router = express.Router()

router.post('/login', loginApi.login)
router.post('/logout', loginApi.logout)
router.post('/register', loginApi.register)
router.post('/checkToken', loginApi.checkToken)
router.get('/weather/cities', weatherApi.retrieveCitiesWeatherInfo)
router.get('/weather/areas', weatherApi.retrieveAreasWeatherInfo)

export default router