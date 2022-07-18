<script lang="ts">
  import Footer from "./lib/components/Footer.svelte";
  import NavBar from "./lib/components/NavBar.svelte";
  import Dashboard from "./lib/pages/Dashboard.svelte";
  import Landing from "./lib/pages/Landing.svelte";
  import { wallet } from "./lib/stores/wallet";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
  />
</svelte:head>

<main>
  <NavBar />
  {#if !$wallet}
    <Landing />
  {:else}
    <Dashboard />
  {/if}
  <Footer />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    margin: 0 auto;
  }
</style>
