import fs from "fs";
import { File, NFTStorage } from "nft.storage";
import path from "path";

export const storeFile = async (path: string) => {
    const file = await fileFromPath(path);

    const apiKey = process.env.NFT_STORAGE_API_KEY;
    if (!apiKey) {
        throw new Error("NFT_STORAGE_API_KEY is missing")
    }
    const nftstorage = new NFTStorage({ token: apiKey })

    return await nftstorage.storeBlob(file);
}

const fileFromPath = async (filePath: string) => {
    const content = await fs.promises.readFile(filePath);

    return new File([content], path.basename(filePath), { type: "application/octet-stream" });
}
