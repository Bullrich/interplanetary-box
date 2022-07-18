import { Chains } from "../utils/chains";

export const chainToUse:number = +import.meta.env.VITE_CHAIN_NUMBER || Chains.OPTIMISM_KOVAN;

export const serverUrl = import.meta.env.MODE == "development" ? "http://localhost:4000/api/" : import.meta.env.VITE_SERVER_URL || "/api/";
