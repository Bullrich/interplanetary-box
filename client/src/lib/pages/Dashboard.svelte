<script lang="ts">
    import { fly } from "svelte/transition";

    import { Button, Container, Spinner } from "sveltestrap";
    import Box from "../components/Box.svelte";
    import type { InterplanetaryBox } from "../contracts";
    import { wallet } from "../stores/wallet";
    import { deploy } from "../utils/contract";
    import { generateEncryptionKey } from "../utils/uploader";
    import { getPublicKey } from "../utils/walletUtils";

    let box: Promise<InterplanetaryBox>;
    let message: string = "Deploy box";

    async function loadDeployContract() {
        message = "Getting public key";
        const publicKey = await getPublicKey();
        message = "Generating encryption key";
        const encryptionKey = await generateEncryptionKey(publicKey);
        message = "Deploying smart contract";
        const boxDeployment = await deploy(encryptionKey);
        box = boxDeployment.deployed();
    }
</script>

<Container>
    {#if $wallet}
        {#if !box}
            <Button
                on:click={() => loadDeployContract()}
                disabled={message != "Deploy box"}
            >
                {#key message}
                    <div in:fly={{ y: -20 }}>{message}</div>
                {/key}
            </Button>
        {:else}
            {#await box}
                <div transition:fly={{ y: 200, duration: 200 }}>
                    <Spinner />
                    <br />
                    <h3>Loading!</h3>
                </div>
            {:then deployedBox}
                <h3>
                    <Box box={deployedBox} />
                </h3>
            {/await}
        {/if}
    {:else}
        <h3>Please connect your wallet!</h3>
    {/if}
</Container>
