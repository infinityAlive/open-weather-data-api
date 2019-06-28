import cors from 'cors'
import jwt from 'jsonwebtoken'
import loginService from '../service/login-service'
import { HttpStatus, LoginInfo } from '../common/messages'
import config from '../config'

const register = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const account = request.body.account
      const password = request.body.password
      const loginMessage = await loginService.register(account, password)
      response.status(HttpStatus.OK_200).send(loginMessage)
    }
  })
}

const login = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const account = request.body.account
      const password = request.body.password
      const loginMessage = await loginService.retrieve(account, password)

      /* JWT */
      const token = jwt.sign({
        account: account
      }, config.secret, { expiresIn: 60 * 60 })

      if (loginMessage.indexOf('failed') >= 0) {
        response.status(HttpStatus.UNAUTHORIZED_401).send(loginMessage)
      } else {
        response.status(HttpStatus.OK_200).send({
          loginMessage: loginMessage,
          token: token
        })
      }
    }
  })
}

const logout = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      response.status(HttpStatus.OK_200).send(LoginInfo.LOGOUT_SUCCESS)
    }
  })
}

const checkToken = (request, response) => {
  let corsFn = cors()
  corsFn(request, response, async () => {
    if (request.method === 'POST') {
      const token = request.body.token
      if (token) {
        jwt.verify(token, config.secret, (error, decode) => {
          if (error) {
            response.status(HttpStatus.UNAUTHORIZED_401).send(LoginInfo.TOKEN_IS_ERROR)
          } else {
            console.log(`Decode, account is = ${decode.account}`)
            response.status(HttpStatus.OK_200).send(decode.account)
          }
        })
      } else {
        response.status(HttpStatus.UNAUTHORIZED_401).send(LoginInfo.TOKEN_IS_ERROR)
      }
    }
  })
}

export { register, login, logout, checkToken }