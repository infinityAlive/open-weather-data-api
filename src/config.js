import 'dotenv/config'

const config = {
  mongoDbUri: process.env['MONGODB_URI'],
  secret: process.env['SECRET']
}

export default config