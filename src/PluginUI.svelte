<script>
  import { GlobalCSS } from "figma-plugin-ds-svelte";
  import { IconButton, IconSearch, Input } from "figma-plugin-ds-svelte";

  // START-TODO
  import Test from "./logos/test.svg";

  const logos = [
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
    {
      name: "Test",
      logo: Test,
    },
  ];
  // END-TODO

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

  <!-- https://shiftnudge.com/ -->
  <ul>
    {#each logos as { logo }}
      <!-- 32px x 32px -->
      <!-- https://github.com/thomas-lowry/figma-plugin-ds-svelte#icon -->
      <!-- https://github.com/thomas-lowry/figma-plugin-ds-svelte#icon-button -->
      <li><IconButton iconName={logo} /></li>
    {/each}
  </ul>
</div>

<style>
  ul {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
    justify-items: center;

    list-style: none;
    padding-inline-start: 0px;

    margin-block-start: var(--size-xxsmall);
    margin-block-end: var(--size-xxsmall);
  }
</style>
