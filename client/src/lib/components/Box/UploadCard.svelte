<script lang="ts">
    import { fly } from "svelte/transition";
    import { encryptAndUpload } from "../../utils/api";

    import { chainToUse } from "../../config";
    import {
        Button,
        Card,
        CardBody,
        CardHeader,
        CardTitle,
        Input,
    } from "sveltestrap";
    import type { InterplanetaryBox } from "../../contracts/contracts/InterplanetaryBox";
    import { changeNetwork } from "../../utils/chains";

    export let getKey: () => Promise<string>;
    export let onUpload: () => void;
    export let box: InterplanetaryBox;
    let loadingMessage: string;

    let fileVar: FileList;

    async function uploadFile() {
        const file = fileVar[0];
        await changeNetwork(chainToUse);
        loadingMessage = "Encrypting file";
        const key = await getKey();
        loadingMessage = "Uploading file";
        const cid = await encryptAndUpload(file, key);
        loadingMessage = "Adding file to smart contract";
        const contractUpload = await box.addFile(cid, file.name);
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
        </CardBody>
    </Card>
</div>

<style>
    .upload-card {
        margin-bottom: 20px;
    }
</style>
