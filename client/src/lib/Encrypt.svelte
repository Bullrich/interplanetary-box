<script lang="ts">
    import axios from "axios";
    import { Container } from "sveltestrap";
    import { serverUrl } from "./utils/server";
import { getPublicKey } from "./utils/walletUtils";

    let text: string;
    let encryptedData: string;

    async function sendEncryption() {
        const key = await getPublicKey();
        const data: { data: string; key: string } = { data: text, key };
        console.log("data", data);
        const result = await axios.post(`${serverUrl}encrypt`, data);
        console.log("result", result);
        encryptedData = result.data;
    }

    async function decrypt() {
        const account = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        const decrypt = await window.ethereum.request({
            method: "eth_decrypt",
            params: [encryptedData, account[0]],
        });
        console.log("decrypted data is:", decrypt);
        return decrypt;
    }
</script>

<Container>
    <div class="encryptor">
        <input type="text" bind:value={text} />
        <p>Encrypt {text}</p>

        <button on:click={() => sendEncryption()}>Encrypt</button>
        <br />
        <input type="text" bind:value={encryptedData} disabled />

        <button on:click={() => decrypt()}>Decrypt</button>
    </div>
</Container>
