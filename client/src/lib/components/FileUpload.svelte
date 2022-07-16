<script lang="ts">
  import axios from "axios";
  import { serverUrl } from "../utils/server";
  import { getPublicKey } from "../utils/walletUtils";
  import {encryptData} from "../utils/cryptography";

  let postVar;
  let fileVar: FileList;
  let key: string;

  async function submitForm(event: Event) {
    event.preventDefault();
    if (!key) key = await getPublicKey();

    const dataArray = new FormData();
    dataArray.append("superHeroName", postVar);
    const file = fileVar[0];
    console.log(file);
    const encryptedFile = encryptData(file, "abcdefg");
    console.log(encryptedFile);
    
    dataArray.append("files", file);
    console.log(key);
    var blob = new Blob([key], { type: "text/xml"});
    dataArray.append("key", blob);
    dataArray.append("name", key);

    axios.post(`${serverUrl}upload`, dataArray, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
</script>

<div>
  <form on:submit={submitForm}>
    <input type="text" bind:value={postVar} placeholder={"Superhero Name"} />
    <br />
    <input type="file" bind:files={fileVar} />
    <br />
    <input type="submit" />
  </form>
</div>
