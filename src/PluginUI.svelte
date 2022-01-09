<script>
  import { GlobalCSS } from "figma-plugin-ds-svelte";
  import { Input } from "figma-plugin-ds-svelte";

  let searchValue = "";
</script>

<div class="p-xxsmall"><Input bind:value={searchValue} /></div>
