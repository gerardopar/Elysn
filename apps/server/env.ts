import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  PORT: z.string().default("8080"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  CRON_SECRET: z.string(),
  REDIS_URL: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string(),
  REDIS_USERNAME: z.string(),
  REDIS_PASSWORD: z.string(),
  MONGODB_USER: z.string(),
  MONGODB_PASSWORD: z.string(),
  MONGODB_HOST: z.string(),
  MONGODB_DB: z.string(),
  MONGODB_APPNAME: z.string(),
  FIREBASE_SERVICE_ACCOUNT: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_S3_BUCKET_NAME: z.string(),
  AWS_S3_BUCKET_REGION: z.string(),
  OPENAI_API_KEY: z.string(),
});

export const env = envSchema.parse({
  ...process.env,
});
