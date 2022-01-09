<script>
  import { GlobalCSS } from "figma-plugin-ds-svelte";
  import { Input, IconSearch } from "figma-plugin-ds-svelte";

  let searchValue = "";
</script>

<!-- https://github.com/thomas-lowry/figma-plugin-ds-svelte/blob/master/src/global.css -->
<div class="wrapper p-xxsmall">
  <!-- https://github.com/thomas-lowry/figma-plugin-ds-svelte#Input -->
  <Input
    bind:value={searchValue}
    iconName={IconSearch}
    placeholder="Search..."
  />
</div>
