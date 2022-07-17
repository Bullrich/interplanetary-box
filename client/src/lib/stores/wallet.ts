import { ethers } from "ethers";
import { writable } from "svelte/store";

export async function connectWallet(): Promise<ethers.providers.JsonRpcProvider> {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });

    return provider;
}

function createWalletAuth() {
    const { subscribe, set } = writable<string>();

    return {
        subscribe,
        signIn: async () => {
            const wallets = await connectWallet();
            const signer = wallets.getSigner();
            const address = await signer.getAddress()
            set(address);
        }
    }
}
export const wallet = createWalletAuth();
