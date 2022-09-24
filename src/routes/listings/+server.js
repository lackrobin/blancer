
import { client as db} from "../../lib/db"
import faunadb from "faunadb";

const {
    Paginate, Documents, Map, Collection, Lambda, Get
} = faunadb.query

export async  function GET() {
    
    const doc = await db.query(
        Map(
            Paginate(Documents(Collection('listing'))),
            Lambda(x => Get(x))
          )
    )

  return new Response(JSON.stringify(doc), {headers: {
    
  }});
}