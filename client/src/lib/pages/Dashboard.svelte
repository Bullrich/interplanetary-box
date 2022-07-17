<script lang="ts">
    
    import { Button,Container } from "sveltestrap";
import Box from "../components/Box.svelte";
    import type { InterplanetaryBox } from "../contracts";
    import { wallet } from "../stores/wallet";
    import { deploy } from "../utils/contract";
    import { generateEncryptionKey } from "../utils/uploader";
    import { getPublicKey } from "../utils/walletUtils";

    let box: Promise<InterplanetaryBox>;

    enum FlowState {
        Login,
        NoContract,
        Deploying,
        Deployed,
    }

    async function loadDeployContract() {
        const publicKey = await getPublicKey();
        const encryptionKey = await generateEncryptionKey(publicKey);
        const boxDeployment = await deploy(encryptionKey);
        box = boxDeployment.deployed();
    }
</script>

<Container>
    {#if $wallet}
        {#if !box}
            <Button on:click={() => loadDeployContract()}>Deploy box</Button>
        {:else}
            {#await box}
                <h3>Loading!</h3>
            {:then deployedBox}
                <h3>
                    <Box box={deployedBox}/>
                </h3>
            {/await}
        {/if}
    {:else}
        <h3>Please connect your wallet!</h3>
    {/if}
</Container>
