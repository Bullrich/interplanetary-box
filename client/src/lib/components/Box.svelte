<script lang="ts">
    import { Col, Container, Row } from "sveltestrap";
    import type { InterplanetaryBox } from "../contracts/contracts/InterplanetaryBox";
    import { decryptMessage } from "../utils/walletUtils";
    import DownloadCard from "./Box/DownloadCard.svelte";
    import UploadCard from "./Box/UploadCard.svelte";

    export let box: InterplanetaryBox;
    let filesPromise = box.getFiles();
    let encryptionKey: string;

    async function getKey(): Promise<string> {
        if (!encryptionKey) {
            const key = await box.Key();
            encryptionKey = await decryptMessage(key);
        }
        return encryptionKey;
    }
</script>

<Container>
    {#await filesPromise}
        <h5>Loading files from the smart contract</h5>
    {:then files}
        <Row>
            <Col>
                <UploadCard
                    {box}
                    {getKey}
                    onUpload={() => (filesPromise = box.getFiles())}
                />
            </Col>
            {#each files as file}
                <Col>
                    <DownloadCard {box} fileName={file} {getKey} />
                </Col>
            {/each}
        </Row>
    {/await}
</Container>
