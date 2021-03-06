import { MongoClient } from 'mongodb';

import { DBNAME } from './constants';

const uri = process.env.NODE_ENV == 'development' 
  ? process.env.MONGO_LOCAL 
  : process.env.MONGO_AWSGM2;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export async function connect() {
  // if (!client.isConnected()) await client.connect(); // v3.6.9
  if (client) await client.connect(); // v.4.0.0

  const db = client.db(DBNAME);

  return { db, client }
}
