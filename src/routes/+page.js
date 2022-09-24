   
export const load = async ({ fetch }) => {
    const r = await fetch('/listings')
    const listings = await r.json()

    const data = {
        listings: listings.data,
        categories: ["JOB", "SERVICE"]
    }
    return data
  }