import { chainToUse } from "../config";
import { InterplanetaryBox__factory } from "../contracts/factories/contracts/InterplanetaryBox__factory";
import { connectWallet } from "../stores/wallet";
import { changeNetwork } from "./chains";

export const deploy = async (key: string) => {
    await changeNetwork(chainToUse);

    const provider = await connectWallet()
    const signer = provider.getSigner();

    const factory = new InterplanetaryBox__factory(signer);
    const interplanetaryBox = await factory.deploy(key);
    return interplanetaryBox;
}
