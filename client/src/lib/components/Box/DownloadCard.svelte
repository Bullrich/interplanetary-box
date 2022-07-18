<script lang="ts">
    import axios from "axios";
    import { decryptString } from "../../utils/cryptography";

    import type { InterplanetaryBox } from "src/lib/contracts";
    import { Button,Card,CardBody,CardSubtitle } from "sveltestrap";
    export let fileName: string;
    export let getKey: () => Promise<string>;
    export let box: InterplanetaryBox;
    let loadingMessage:string;

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
        loadingMessage = '';
    }
</script>

<Card>
    <CardBody>
        <CardSubtitle>
            {fileName}
        </CardSubtitle>
        <Button on:click={() => downloadFile(fileName)} disabled={!!loadingMessage}>
            {loadingMessage || "Download file" }
        </Button>
    </CardBody>
</Card>
