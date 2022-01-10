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

  // https://www.figma.com/plugin-docs/api/properties/figma-ui-postmessage/
  // https://svelte.dev/tutorial/component-events
  // https://github.com/thomas-lowry/figma-plugin-ds-svelte/blob/master/src/components/IconButton/index.svelte
  // https://stackoverflow.com/a/61025286
  // https://github.com/kevinwuhoo/vector-logos-figma-plugin/blob/master/ui.html#L295
  function handleLogoClick({ name, logo }) {
    parent.postMessage(
      {
        pluginMessage: {
          type: "add-logo",
          name,
          logo,
        },
      },
      "*"
    );
  }

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
    {#each logos as { name, logo }}
      <!-- 32px x 32px -->
      <!-- https://github.com/thomas-lowry/figma-plugin-ds-svelte#icon -->
      <!-- https://github.com/thomas-lowry/figma-plugin-ds-svelte#icon-button -->
      <li>
        <IconButton
          iconName={logo}
          on:click={() => handleLogoClick({ name, logo })}
        />
      </li>
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
