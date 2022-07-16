import type { ethers } from "ethers";
import { InterplanetaryBox__factory } from "../contracts/factories/contracts/InterplanetaryBox__factory";
import { Chains, changeNetwork } from "./chains";

export const deploy = async (provider: ethers.providers.JsonRpcSigner, key: string) => {
    await changeNetwork(Chains.MUMBAI);

    // console.log(provider, provider.network);
    // const signer = await provider.getSigner();
    const factory = new InterplanetaryBox__factory(provider);
    const interplanetaryBox = await factory.deploy(key);
    return interplanetaryBox;
}
