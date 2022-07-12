import { encrypt as sigEncrypt } from "@metamask/eth-sig-util";
import { bufferToHex } from "ethereumjs-util";

export const encrypt = (message: string, publicKey: string) => {
    const encryptedMessage = bufferToHex(
        Buffer.from(
            JSON.stringify(
                sigEncrypt({
                    publicKey: publicKey,
                    data: message,
                    version: "x25519-xsalsa20-poly1305",
                })
            ),
            "utf8"
        )
    );
    return encryptedMessage;
};
