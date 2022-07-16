<script lang="ts">
  import logo from "./assets/svelte.png";
  import Encrypter from "./lib/components/Encrypter.svelte";
  import FileUpload from "./lib/components/FileUpload.svelte";
  import Counter from "./lib/Counter.svelte";
  import Encrypt from "./lib/Encrypt.svelte";
  import NavBar from "./lib/components/NavBar.svelte";
  import Dashboard from "./lib/pages/Dashboard.svelte";
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
  />
</svelte:head>

<main>
  <NavBar />
  <img src={logo} alt="Svelte Logo" />
  <h1>Hello Typescript!</h1>

  <Dashboard />

  <br />
  <hr />

  <Encrypter />

  <Encrypt />

  <FileUpload />
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

  img {
    height: 16rem;
    width: 16rem;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }
</style>
