<script lang="ts">
    import { AES, enc } from "crypto-js";

    import { decryptData, encryptData } from "../utils/cryptography";

    let pureFile, encryptedFile: FileList;
    let key: string;

    async function encryptAndDecrypt(e: Event) {
        e.preventDefault();
        const file = pureFile[0];
        console.log(file);
        const encryptedFile = await encryptData(file, key);
        console.log("encrypted!", encryptedFile);
        var decrypted = AES.decrypt(encryptedFile, key).toString(enc.Latin1);

        var a = document.createElement("a");
        console.log(decrypted);
        a.setAttribute("href", decrypted);
        a.setAttribute("download", file.name.replace(".encrypted", ""));
        a.click();
    }

    async function encrypt(e: Event) {
        e.preventDefault();
        const file = pureFile[0];
        if (file.size > 1024 * 1024) {
            alert(
                "Please choose files smaller than 1mb, otherwise you may crash your browser. \nThis is a known issue. See the tutorial."
            );
            return;
        }
        console.log(file);
        const encryptedFile = await encryptData(file, key);
        console.log("encryptedFile", encryptedFile);
        var a = document.createElement("a");
        a.setAttribute(
            "href",
            `data:application/octet-stream,${encryptedFile}`
        );
        a.setAttribute("download", file.name + ".encrypted");
        a.click();
    }

    async function decrypt(e: Event) {
        e.preventDefault();
        console.log("ho");
        const file = encryptedFile[0];
        const decryptedFile = await decryptData(file, key);
        console.log("decryptedFile", decryptedFile);

        var a = document.createElement("a");
        console.log(decryptedFile);
        a.setAttribute("href", decryptedFile);
        a.setAttribute("download", file.name.replace(".encrypted", ""));
        a.click();
    }
</script>

<div>
    <form>
        <input type="text" bind:value={key} placeholder={"Password"} />
        <br />
        <label for="pure">File to encrypt</label>
        <input type="file" id="pure" bind:files={pureFile} />
        <button on:click={encrypt}>Encrypt</button>
        <button on:click={encryptAndDecrypt}>Encrypt & Decrypt</button>
        <br />

        <label for="pure">File to encrypt</label>
        <input type="file" id="pure" bind:files={encryptedFile} />
        <button on:click={decrypt} accept=".encrypted">Decrypt</button>
    </form>
</div>
