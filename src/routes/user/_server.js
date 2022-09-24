import { error } from '@sveltejs/kit';
 
/** @type {import('./$types').RequestHandler} */
export function GET() {
    const user = {user: 1}
  return new Response(JSON.stringify(user), {headers: {
    
  }});
}