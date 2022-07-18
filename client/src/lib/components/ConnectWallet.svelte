<script lang="ts">
    import { Button } from "sveltestrap";
    import { wallet } from "../stores/wallet";
</script>

<Button on:click={() => wallet.signIn()}>Connect Wallet</Button>
