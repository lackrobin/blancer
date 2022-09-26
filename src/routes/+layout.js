   
import { username } from "../stores";
import { get } from "svelte/store";

export const load = async ({ fetch }) => {
    if (get(username)!== "anon"){
      return {
          username: get(username)
      }
    }
    const r = await fetch('/username')
    const data = await r.json()
    return data
  }