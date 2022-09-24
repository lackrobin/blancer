import { client as db} from "./db.js"
import faunadb from "faunadb";

const {
  Match, Get, Index, Create, Collection
} = faunadb.query

export async function createUserIfNotExist(user) {
    const doc = await db.query(
        Get(
            Match(Index('users_by_pubkey'),user)
          )
    ).catch( async (e) => {
      console.log(e)
      console.log("the user was not found! creating new user for: " + user)
      const doc = await db.query(
        Create(Collection('users'),{
          "pubkey": user
        })
      )
    })
      
  return true
}