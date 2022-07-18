import { ethers } from "ethers";

export const Chains = {
    POLYGON: 137,
    MUMBAI: 80001,
    OPTIMISM: 10,
    CRONOS: 338,
    BOBA: 28,
    SKALE: 344435,
    RINKEBY: 4,
    ROPSTEN: 3,
    OPTIMISM_KOVAN: 69
}

interface ChainData {
    chainName: string;
    chainId: string;
    nativeCurrency: { name: string; decimals: number, symbol: string };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
}

const chainData: Map<number, ChainData> = new Map<number, ChainData>([[
    Chains.POLYGON, {
        chainName: 'Polygon Mainnet',
        chainId: ethers.utils.hexValue(Chains.POLYGON),
        nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
        rpcUrls: ['https://polygon-rpc.com/'],
        blockExplorerUrls: ['https://polygonscan.com/']
    }], [
    Chains.MUMBAI, {
        chainName: 'Polygon Mumbai',
        chainId: ethers.utils.hexValue(Chains.MUMBAI),
        nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
        rpcUrls: ['https://matic-mumbai.chainstacklabs.com'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/']
    }],
    [Chains.OPTIMISM_KOVAN, {
        chainName: 'Optimism Kovan',
        chainId: ethers.utils.hexValue(Chains.OPTIMISM_KOVAN),
        nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
        rpcUrls: ['https://kovan.optimism.io'],
        blockExplorerUrls: ['https://kovan-optimistic.etherscan.io/']
    }]
]);

export const changeNetwork = async (chainId: number): Promise<void> => {
    return new Promise((res, rej) => {
        if (window.ethereum.networkVersion === chainId.toString()) {
            return res();
        }
        window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: ethers.utils.hexValue(chainId) }],
        }).then(() => res())
            .catch(err => {
                // This error code indicates that the chain has not been added to MetaMask
                if (err.code !== 4902) {
                    console.warn("Could not connect to chain", chainId);
                    return rej(err);
                }
                const parameters = chainData.get(chainId);
                if (!parameters) {
                    return rej(`chainId ${chainId} is not in the list of chainData`);
                }
                window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [parameters]
                }).then(() => res())
                    .catch(e => {
                        console.error("Problem installing chain", chainId);
                        rej(e)
                    });
            });
    });
}
