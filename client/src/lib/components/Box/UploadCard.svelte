<script lang="ts">
    import { encryptAndUpload } from "../../utils/uploader";

    import {
    Button,
    Card,
    CardBody,
    CardHeader,
    CardTitle
    } from "sveltestrap";
    import type { InterplanetaryBox } from "../../contracts/contracts/InterplanetaryBox";

    export let getKey: () => Promise<string>;
    export let onUpload: () => void;
    export let box: InterplanetaryBox;
    let loadingMessage: string;

    let fileVar: FileList;

    async function uploadFile() {
        const file = fileVar[0];
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

<Card>
    <CardHeader>
        <CardTitle>Upload a file</CardTitle>
    </CardHeader>
    <CardBody>
        <input type="file" bind:files={fileVar} />
        <Button on:click={uploadFile} disabled={!fileVar || !!loadingMessage}>
            {loadingMessage || "Upload file"}
        </Button>
    </CardBody>
</Card>
