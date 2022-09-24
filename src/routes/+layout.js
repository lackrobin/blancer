   
export const load = async ({ fetch }) => {
    const r = await fetch('/user')
    const data = await r.json()
    return data
  }