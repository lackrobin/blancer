import faunadb from "faunadb";
export const client = new faunadb.Client({ secret: process.env.FAUNA_BASIC_USER_KEY })