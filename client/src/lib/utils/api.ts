import axios from "axios";
import { serverUrl } from "../config";
import { encryptData } from "./cryptography";

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
    var blob = new Blob([encryptedFile], { type: "text/xml" });
    dataArray.append("files", blob);
    const data = await axios.post(`${serverUrl}upload`, dataArray, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return data.data;
}

export const generateEncryptionKey = async (publicKey: string): Promise<string> => {
    const obj = JSON.stringify({ key: publicKey });
    const data = await axios.post<string>(`${serverUrl}encrypt`, obj, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(data);
    return data.data;
}

export const getContractAddress = async (address: string): Promise<string | null> => {
    try {
        const data = await axios.get<string>(`${serverUrl}contract?address=${address}`);
        if (data.status == 200) {
            return data.data;
        } else {
            return null;
        }
    }
    catch (e) {
        return null;
    }
}

export const registerContractAddress = async (address: string, contractAddress: string): Promise<void> => {
    const body = JSON.stringify({ address, contract: contractAddress });
    try {
        const response = await axios.post(`${serverUrl}contract`, body, {
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (e) {
        console.error(e);
    }
}
