<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import { Button, Card, CardBody, Container, Spinner } from "sveltestrap";
    import Box from "../components/Box.svelte";
    import {
        InterplanetaryBox,
        InterplanetaryBox__factory,
    } from "../contracts";
    import { connectWallet, wallet } from "../stores/wallet";
    import {
        generateEncryptionKey,
        getContractAddress,
        registerContractAddress,
    } from "../utils/api";
    import { deploy } from "../utils/contract";
    import { getPublicKey } from "../utils/walletUtils";

    let box: Promise<InterplanetaryBox>;
    let message: string = "Deploy box";

    onMount(async () => {
        if (!$wallet) {
            return;
        }
        const contract = await getContractAddress($wallet);
        if (!contract) {
            return;
        }
        box = fetchContractData(contract);
    });

    async function fetchContractData(contract: string) {
        const wallet = await connectWallet();
        const connectedBox = InterplanetaryBox__factory.connect(
            contract,
            wallet.getSigner()
        );
        return connectedBox;
    }

    async function loadDeployContract() {
        message = "Getting public key";
        const publicKey = await getPublicKey();
        message = "Generating encryption key";
        const encryptionKey = await generateEncryptionKey(publicKey);
        message = "Deploying smart contract";
        const boxDeployment = await deploy(encryptionKey);
        box = boxDeployment.deployed();
        const deployedBox = await box;
        const contractAddress = deployedBox.address;
        await registerContractAddress($wallet, contractAddress);
    }
</script>

<Container style="margin-top: 50px; min-height: 80vh;">
    {#if $wallet}
        {#if !box}
            <Card>
                <CardBody>
                    <h2>You don't have any deployed box</h2>
                    <h4>Deploy your box and start storing your files</h4>
                    <Button
                        on:click={() => loadDeployContract()}
                        disabled={message != "Deploy box"}
                    >
                        {#key message}
                            <div in:fly={{ y: -20 }}>{message}</div>
                        {/key}
                    </Button>
                </CardBody>
            </Card>
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
