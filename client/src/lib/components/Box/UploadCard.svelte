<script lang="ts">
    import { cubicOut } from "svelte/easing";
    import { tweened } from "svelte/motion";
    import { fly } from "svelte/transition";
    import {
        Button,
        Card,
        CardBody,
        CardHeader,
        CardTitle,
        Input,
        Progress,
    } from "sveltestrap";
    import { chainToUse } from "../../config";
    import type { InterplanetaryBox } from "../../contracts/contracts/InterplanetaryBox";
    import { encryptAndUpload } from "../../utils/api";
    import { changeNetwork } from "../../utils/chains";

    export let getKey: () => Promise<string>;
    export let onUpload: () => void;
    export let box: InterplanetaryBox;
    let loadingMessage: string;

    let fileVar: FileList;

    const progress = tweened(0, {
        duration: 400,
        easing: cubicOut,
    });

    async function uploadFile() {
        const file = fileVar[0];
        progress.set(10);
        await changeNetwork(chainToUse);
        loadingMessage = "Encrypting file";
        progress.set(25);
        const key = await getKey();
        loadingMessage = "Uploading file";
        progress.set(50);
        const cid = await encryptAndUpload(file, key);
        loadingMessage = "Adding file to smart contract";
        progress.set(75);
        const contractUpload = await box.addFile(cid, file.name);
        progress.set(100);
        await contractUpload.wait();
        onUpload();
    }
</script>

<div class="upload-card">
    <Card>
        <CardHeader>
            <CardTitle>Upload a file</CardTitle>
        </CardHeader>
        <CardBody>
            <Input
                type="file"
                name="file"
                id="exampleFile"
                bind:files={fileVar}
            />
            <Button
                on:click={uploadFile}
                disabled={!fileVar || !!loadingMessage}
            >
                {#key loadingMessage}
                    <div in:fly={{ y: -20 }}>
                        {loadingMessage || "Upload file"}
                    </div>
                {/key}
            </Button>
            {#if loadingMessage}
                <hr />
                <Progress color="success" value={$progress} />
            {/if}
        </CardBody>
    </Card>
</div>

<style>
    .upload-card {
        margin-bottom: 20px;
    }
</style>
