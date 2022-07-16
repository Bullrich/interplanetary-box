/// <reference types="svelte" />
/// <reference types="vite/client" />

type EthMethods = "eth_requestAccounts" | "eth_getEncryptionPublicKey" | "eth_decrypt" | "wallet_switchEthereumChain" | "wallet_addEthereumChain"

type RequestParams = { method: EthMethods, params?: any[] };

interface Window {
    ethereum: {
        request(req: RequestParams): Promise<any>;
        networkVersion: string;
    }
}
