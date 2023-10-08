import dotEnv from 'dotenv';
dotEnv.config();

/**
 * The DATABASE_URL environment variable.
 * This variable should contain the URL for the database connection.
 */
export const DATABASE_URL = process.env.DATABASE_URL;

/**
 * The PORT environment variable.
 * This variable should contain the port number on which the server will run.
 */
export const PORT = process.env.PORT;
