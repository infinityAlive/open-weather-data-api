import xorCrypt from 'xor-crypt'
import * as mongodbCrud from '../mongo-db-crud'
import config from '../config'
import { LoginInfo } from '../common/messages'

const loginService = {}
loginService.retrieve = async (account, password) => {
  try {
    const loginInfo = await mongodbCrud.findOne('LoginInfo',
      {
        _id: account
      })

    if (loginInfo) {
      const decryptedPwd = xorCrypt(loginInfo.password)
      if (decryptedPwd === password) {
        return LoginInfo.LOGIN_SUCCESS
      } else {
        return LoginInfo.LOGIN_PWD_DIFF
      }
    } else {
      return LoginInfo.LOGIN_ACCOUNT_IS_EMPTY
    }
  } catch (error) {
    console.error(error)
    return LoginInfo.LOGIN_FAILED
  }
}

loginService.register = async (account, password) => {
  const loginInfo = await mongodbCrud.findOne('LoginInfo',
    {
      _id: account
    })

  if (loginInfo && Object.keys(loginInfo).length > 0) {
    return LoginInfo.REGISTER_ACCOUNT_IS_EXISTED
  }

  try {
    await mongodbCrud.insert('LoginInfo',
      {
        _id: account,
        password: xorCrypt(password)
      })

    return LoginInfo.REGISTER_SUCCESS
  } catch (error) {
    console.error(error)
    return LoginInfo.REGISTER_FAILED
  }
}

export default loginService