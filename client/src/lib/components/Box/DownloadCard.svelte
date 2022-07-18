<script lang="ts">
    import axios from "axios";
    import { fly } from "svelte/transition";
    import { decryptString } from "../../utils/cryptography";

    import type { InterplanetaryBox } from "src/lib/contracts";
    import {
    Button,
    Card,
    CardBody,
    CardHeader,CardTitle
    } from "sveltestrap";
    export let fileName: string;
    export let getKey: () => Promise<string>;
    export let box: InterplanetaryBox;
    let loadingMessage: string;

    async function downloadFile(fileName: string) {
        loadingMessage = "Getting file hash";
        const hash = await box.files(fileName);
        return downloadFileFromHash({ file: fileName, hash });
    }

    async function downloadFileFromHash(hashData: {
        file: string;
        hash: string;
    }) {
        const downloadUrl = `https://${hashData.hash}.ipfs.nftstorage.link/`;
        loadingMessage = "Downloading file";
        const { data } = await axios.get<string>(downloadUrl);
        if (!data) {
            throw new Error("No data!");
        }
        loadingMessage = "Decrypting message";
        const encryptionKey = await getKey();
        const decryptedFile = decryptString(data, encryptionKey);

        var a = document.createElement("a");
        console.log(decryptedFile);
        a.setAttribute("href", decryptedFile);
        a.setAttribute("download", hashData.file);
        a.click();
        loadingMessage = "";
    }
</script>

<div class="download-card">
    <Card>
        <CardHeader>
            <CardTitle>{fileName}</CardTitle>
        </CardHeader>
        <CardBody>
            <Button
                on:click={() => downloadFile(fileName)}
                disabled={!!loadingMessage}
            >
                {#key loadingMessage}
                    <div in:fly={{ y: -20 }}>
                        {loadingMessage || "Download file"}
                    </div>
                {/key}
            </Button>
        </CardBody>
    </Card>
</div>

<style>
    .download-card {
        margin-bottom: 20px;
    }
</style>
