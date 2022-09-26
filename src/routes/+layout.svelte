<script>
	import Header from "../components/Header.svelte";
    import { username } from "../stores";
    import "../app.css";
    export let data
    console.log(data)
    username.set(data.username)

</script>
  
<Header></Header>
  <slot />