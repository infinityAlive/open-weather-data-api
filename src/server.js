import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router'
import path from 'path'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const app = express()
const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  let host = server.address().address
  let port = server.address().port
  console.log(`listening at host(${host}), port(${port})`)
})

app.use(cors())
app.options('*', cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', router)