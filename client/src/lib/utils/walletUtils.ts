export async function getPublicKey(): Promise<string> {
    const account = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    const key = await window.ethereum.request({
        method: "eth_getEncryptionPublicKey",
        params: [account[0]],
    });
    return key;
}

export async function decryptMessage(message: string): Promise<string> {
    const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    const decryptedMessage = await window.ethereum
        .request({
            method: 'eth_decrypt',
            params: [message, accounts[0]],
        });
    return decryptedMessage;

}
