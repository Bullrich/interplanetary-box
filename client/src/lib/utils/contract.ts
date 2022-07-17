import type { ethers } from "ethers";
import { InterplanetaryBox__factory } from "../contracts/factories/contracts/InterplanetaryBox__factory";
import { connectWallet } from "../stores/wallet";
import { Chains, changeNetwork } from "./chains";

export const deploy = async (key: string) => {
    await changeNetwork(Chains.OPTIMISM_KOVAN);

    const provider = await connectWallet()
    const signer = provider.getSigner();

    // console.log(provider, provider.network);
    // const signer = await provider.getSigner();
    const factory = new InterplanetaryBox__factory(signer);
    const interplanetaryBox = await factory.deploy(key);
    return interplanetaryBox;
}
