<script lang="ts">
    import { slide } from "svelte/transition";
    import { Col, Container, Row, Spinner } from "sveltestrap";
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
        <h3>Loading files from the smart contract</h3>
        <br />
        <Spinner />
    {:then files}
        <div transition:slide={{ duration: 1000 }}>
            <Row>
                <Col sm={3}>
                    <UploadCard
                        {box}
                        {getKey}
                        onUpload={() => (filesPromise = box.getFiles())}
                    />
                </Col>
                {#each files as file}
                    <Col sm={3}>
                        <DownloadCard {box} fileName={file} {getKey} />
                    </Col>
                {/each}
            </Row>
        </div>
    {/await}
</Container>
