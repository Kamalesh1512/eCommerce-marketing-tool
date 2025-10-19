import dotenv from 'dotenv';
dotenv.config();


export default {
  out: './drizzle',
  schema: './src/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_DATABASE_URL!,
  },
} as const;
