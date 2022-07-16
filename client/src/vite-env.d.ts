/// <reference types="svelte" />
/// <reference types="vite/client" />

type EthMethods = "eth_requestAccounts" | "eth_getEncryptionPublicKey" | "eth_decrypt"

type RequestParams = { method: EthMethods, params?: any[] };

interface Window {
    ethereum: {
        request(req: RequestParams): Promise<any>
    }
}
