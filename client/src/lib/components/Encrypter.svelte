<script lang="ts">
    import { decryptData, encryptData } from "../utils/cryptography";

    let pureFile, encryptedFile: FileList;
    let key: string;

    async function encrypt(e: Event) {
        e.preventDefault();
        const file = pureFile[0];
        console.log(file);
        const encryptedFile = await encryptData(file, key);
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
        <br />

        <label for="pure">File to encrypt</label>
        <input type="file" id="pure" bind:files={encryptedFile} />
        <button on:click={decrypt} accept=".encrypted">Decrypt</button>
    </form>
</div>
