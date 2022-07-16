<script lang="ts">
  import axios from "axios";
  import e from "cors";
  import { decryptString } from "../utils/cryptography";

  import { encryptAndUpload } from "../utils/uploader";
  import { getPublicKey } from "../utils/walletUtils";

  let fileVar: FileList;

  const key = "javier";
  let hashes: { file: string; hash: string }[] = [];

  async function submitForm(event: Event) {
    event.preventDefault();
    const file = fileVar[0];
    const cid = await encryptAndUpload(file, key);
    hashes.push({ file: file.name, hash: cid });

    console.log("cid", cid);
    hashes = hashes;
  }

  async function downloadFileFromHash(e: Event, hashData: { file: string; hash: string }) {
    console.log("yes!");
    e.preventDefault();
    const { data } = await axios.get<string>(
      `https://${hashData.hash}.ipfs.nftstorage.link/`
    );
    if (!data) {
      throw new Error("No data!");
    }
    const decryptedFile = await decryptString(data, key);
    console.log("decryptedFile", decryptedFile);

    var a = document.createElement("a");
    console.log(decryptedFile);
    a.setAttribute("href", decryptedFile);
    a.setAttribute("download", hashData.file);
    console.log(a);
    a.click();
  }
</script>

<div>
  <form on:submit={submitForm}>
    <input type="file" bind:files={fileVar} />
    <br />
    Submit
    <input type="submit" />
    <br />
  </form>
  {#each hashes as hash}
    <br />
    <input type="text" disabled value={hash.hash} />
    <button on:click={(e) => downloadFileFromHash(e, hash)}>
      Download {hash.file}
    </button>
  {/each}
</div>
