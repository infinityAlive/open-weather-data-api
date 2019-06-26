import mongodb from 'mongodb'
import config from './config'

const mongoDbUri = config.mongoDbUri

const retrieveCwbDb = (() => {
  let mongoClient, cwbDb
  return async () => {
    if (!mongoClient) {
      mongoClient = await mongodb.MongoClient
        .connect(mongoDbUri,
          {
            useNewUrlParser: true,
            poolSize: 20
          })
    }

    if (!cwbDb) {
      cwbDb = mongoClient.db('cwb')
    }
    return cwbDb
  }
})()

const findOne = async (collectionName, query) => {
  try {
    const db = await retrieveCwbDb()
    return await db.collection(collectionName).findOne(query)
  } catch (error) {
    console.error(error)
  }
}

const find = async (collectionName, query) => {
  try {
    const db = await retrieveCwbDb()
    return await db.collection(collectionName).find(query).toArray()
  } catch (error) {
    console.error(error)
  }
}

const insert = async (collectionName, document) => {
  try {
    const db = await retrieveCwbDb()
    const insertResult = await db.collection(collectionName).insertOne(document)
    console.log(`Result of insert ${collectionName}, ok = ${insertResult.result.ok}`)
  } catch (error) {
    console.error(error)
  }
}

export { findOne, find, insert }