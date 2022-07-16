import AES from "crypto-js/aes";
import {enc} from "crypto-js"

export const encryptData = (file: File, key: string): Promise<string> => {
    const reader = new FileReader();
    return new Promise((res, rej) => {
        reader.onload = (e) => {
            if (!key) {
                return rej("Missing key");
            }

            const encrypted = AES.encrypt(e.target.result as any, key).toString();
            return res(encrypted);
        }

        reader.readAsDataURL(file);
    });
}


export const decryptData = (file: File, key: string): Promise<string> => {

    const reader = new FileReader();

    return new Promise((res, rej) => {
        reader.onload = function (e) {

            console.log("decrypting with", key);
            var decrypted = AES.decrypt(e.target.result as any, key)
                .toString(enc.Latin1);

            if (!/^data:/.test(decrypted)) {
                return rej("Invalid pass phrase or file! Please try again.");
            }

            return res(decrypted);
        }
        reader.readAsText(file);
    });
}
