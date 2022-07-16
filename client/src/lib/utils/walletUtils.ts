export async function getPublicKey(): Promise<string> {
    const account = await window.ethereum.request({
        method: "eth_requestAccounts",
    });
    console.log("addres is", account[0]);
    const key = await window.ethereum.request({
        method: "eth_getEncryptionPublicKey",
        params: [account[0]],
    });
    return key;
}
