import { client as db} from "./db.js"
import faunadb from "faunadb";

const {
  Match, Get, Index, Create, Collection, Select, Update
} = faunadb.query

export async function createUserIfNotExist(user) {
    const doc = await db.query(
        Get(
            Match(Index('users_by_pubkey'),user.id)
          )
    ).catch( async (e) => {
      console.log(e)
      console.log("the user was not found! creating new user for: " + user.id)
      const doc = await db.query(
        Create(Collection('users'), {data : {
          "pubkey": user.id
        }})
      )
    })
    if(!doc){
      return false
    }
  return true
}

export async function setUsername(user, username) {
  const doc = await db.query(
    Update(
      Select("ref",
        Get(
          Match(Index("users_by_pubkey"), user)
        )
      ),
      {
        data: { username: username }
      }
    )
  )
}


export async function getUsernameByPubkey(pubkey){
  const doc = await db.query(
    Get(
      Match(Index('users_by_pubkey'), pubkey)
    )).catch((e) => {
      console.log(e)
    }
    )
    console.log(doc)
    return doc.data.username
}