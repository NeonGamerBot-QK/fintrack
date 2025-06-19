import type { Config } from 'drizzle-kit';
import { env } from '$env/static/private';


export default {
	schema: './src/lib/server/schema.ts',
	out: './drizzle',
    driver: "durable-sqlite",
    dbCredentials: {
        url: env.DATABASE_URL,
        database: env.DATABASE_NAME,
    },
} 