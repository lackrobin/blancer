import faunadb from "faunadb";
import { config as envconfig } from "dotenv";


if (process.env.NODE_ENV !== 'production') {
	envconfig()
  }

export const client = new faunadb.Client({ secret: process.env.FAUNA_LOGGED_IN_USER_KEY })