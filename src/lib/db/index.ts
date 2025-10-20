import dotenv from 'dotenv';
dotenv.config();

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from "pg";
const { Pool } = pg;
import * as schema from "./schema";

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.NEXT_DATABASE_URL,
        ssl: {
          rejectUnauthorized: true,
          ca: Buffer.from(process.env.NEXT_AZURE_CA_CERTS!, 'base64').toString('utf-8'),
        },
        max: 5,
        idleTimeoutMillis: 10000,
      }
    : {
        connectionString: process.env.NEXT_DATABASE_URL,
        ssl: false,
        max: 5,
        idleTimeoutMillis: 10000,
      }
);

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Database connection already established!');
    return;
  }

  try {
    await pool.connect();
    isConnected = true;
    console.log(`Connected to the ${isProduction ? 'production' : 'local'} database!`);
  } catch (err) {
    console.error('Database connection error:', err);
  }
};

connectDB();

export const db = drizzle(pool, { schema });
