import { ethers } from "ethers";
import { writable } from "svelte/store";

export async function connectWallet(): Promise<ethers.providers.JsonRpcProvider> {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    await ethereum.request({ method: "eth_requestAccounts" });
    console.log(provider.getSigner());

    return provider;
}

function createProvider() {
    const { subscribe, set } = writable<ethers.providers.JsonRpcProvider & { address: string }>();

    return {
        subscribe,
        signIn: async () => {
            const wallets = await connectWallet();
            // const signer = await wallets.getSigner();
            // const address = await signer.getAddress();
            set(Object.assign({ ...wallets, address:"abc" }));
        }
    }
}
export const provider = createProvider();
