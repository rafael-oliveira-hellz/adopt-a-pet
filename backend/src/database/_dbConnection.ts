import * as dotenv from 'dotenv';

import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URL: any = process.env.MONGO_URL;

async function main() {
  await mongoose.connect(MONGODB_URL);

  console.log('\nConnected to MongoDB Atlas\n');
}

main().catch((err) => console.error(err));

export default mongoose;
