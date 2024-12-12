import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const uri = `mongodb+srv://finance_tracker:THZiPqnwLUBoSCKV@cluster-1.ycl7s40.mongodb.net/?retryWrites=true&w=majority&appName=cluster-1`;

export const user_id = '66404779c1087c5b05b5970b';
let client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
  maxPoolSize: 10,
  maxConnecting: 30,
});

async function connectToDatabase(): Promise<Db> {
  try {
    client = await client.connect();
    return client.db('finance');
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
}
export const database = await connectToDatabase();

export async function closeConnection(): Promise<void> {
  try {
    await client.close();
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
}
