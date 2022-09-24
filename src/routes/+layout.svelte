<script>
	import Header from "../components/Header.svelte";
    import { user } from "../stores";
    import "../app.css";
    export let data

    user.set(data.user)

</script>
  
<Header></Header>
  <slot />