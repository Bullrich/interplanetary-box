<script lang="ts">
    import { decryptData, encryptData } from "../utils/cryptography";

    let pureFile, encryptedFile: FileList;
    let key: string;

    async function encrypt() {
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

    async function decrypt() {
        const file = encryptedFile[0];
        const decryptedFile = await decryptData(file, key);
        console.log("decryptedFile", decryptedFile);

        var a = document.createElement("a");
        console.log(decryptedFile);
        a.setAttribute("href", decryptedFile);
        a.target = "_blank";
        a.setAttribute("onclick", "return false;");
        a.setAttribute("download", file.name.replace(".encrypted", ""));
        console.log(a);
        a.click();
        // window.open(url, '_self');
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
        <a target="_blank" href="https://google.com">a</a>

        <label for="pure">File to encrypt</label>
        <input type="file" id="pure" bind:files={encryptedFile} />
        <button on:click={decrypt} accept=".encrypted">Dencrypt</button>
        <!-- <input type="submit" /> -->
    </form>
</div>
