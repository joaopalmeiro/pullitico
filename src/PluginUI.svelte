<script>
  import { GlobalCSS } from "figma-plugin-ds-svelte";
  import { Input } from "figma-plugin-ds-svelte";

  let searchValue = "";
</script>

<div><Input bind:value={searchValue} /></div>
