import dotenv from 'dotenv';
dotenv.config();

import { drizzle } from 'drizzle-orm/node-postgres';
import pg from "pg";
const { Pool } = pg;

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

export const db = drizzle(pool);

// declare global {
//   var _pgPool: import("pg").Pool | undefined;
// }


// import dotenv from "dotenv";
// dotenv.config();

// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

// const isProduction = process.env.NODE_ENV === "production";

// // Reuse pool in development to prevent multiple connections on hot reload
// let pool: Pool;

// if (!globalThis._pgPool) {
//   pool = new Pool(
//     isProduction
//       ? {
//           connectionString: process.env.NEXT_DATABASE_URL,
//           ssl: {
//             rejectUnauthorized: true,
//             ca: process.env.NEXT_AZURE_CA_CERTS
//               ? Buffer.from(process.env.NEXT_AZURE_CA_CERTS, "base64").toString("utf-8")
//               : undefined,
//           },
//           max: 5,
//           idleTimeoutMillis: 10000,
//         }
//       : {
//           connectionString: process.env.NEXT_DATABASE_URL,
//           ssl: false,
//           max: 5,
//           idleTimeoutMillis: 10000,
//         }
//   );

//   globalThis._pgPool = pool; // store in globalThis to reuse in dev
// } else {
//   pool = globalThis._pgPool;
// }

// // Optional: test connection
// (async () => {
//   try {
//     await pool.connect();
//     console.log(`Connected to the ${isProduction ? "production" : "local"} database!`);
//   } catch (err) {
//     console.error("Database connection error:", err);
//   }
// })();

// // Export Drizzle instance
// export const db = drizzle(pool);
