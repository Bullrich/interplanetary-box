<script lang="ts">
    import type { ethers } from "ethers";

    import { Button, Container } from "sveltestrap";
    import type { InterplanetaryBox } from "../contracts";
    import { connectWallet, provider } from "../stores/wallet";
    import { deploy } from "../utils/contract";

    let box: Promise<InterplanetaryBox>;

    async function loadDeployContract(
        wallet: ethers.providers.JsonRpcProvider
    ) {
        const prov = await connectWallet();
        console.log(wallet.getSigner);
        const boxDeployment = await deploy(prov.getSigner(), "testing");
        box = boxDeployment.deployed();
    }
</script>

<Container>
    {#if $provider}
        {#if !box}
            <Button on:click={() => loadDeployContract($provider)}
                >Deploy box</Button
            >
        {:else}
            {#await box}
                <h3>Loading!</h3>
            {:then deployedBox}
                <h3>
                    Deployed to {deployedBox.address}
                </h3>
            {/await}
        {/if}
    {:else}
        <h3>Please connect your wallet!</h3>
    {/if}
</Container>
