import axios from "axios";
import { encryptData } from "./cryptography";
import { serverUrl } from "./server";

export const encryptAndUpload = async (file: File, key: string) => {
    if (file.size > 1024 * 1024) {
        alert(
            "Please choose files smaller than 1mb, otherwise you may crash your browser. \nThis is a known issue. See the tutorial."
        );
        return;
    }
    console.log(file);
    const encryptedFile = await encryptData(file, key);

    const dataArray = new FormData();
    var blob = new Blob([encryptedFile], { type: "text/xml"});
    dataArray.append("files", blob);
    const data = await axios.post(`${serverUrl}upload`, dataArray, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data.data;
}

export const generateEncryptionKey = async(publicKey:string):Promise<string> => {
    const obj = JSON.stringify({key:publicKey});
    const data = await axios.post<string>(`${serverUrl}encrypt`, obj, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(data);
    return data.data;
}
