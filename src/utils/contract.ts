import { ethers } from "ethers";
import { IzToken, IzToken__factory } from "../contracts/typechain";
import { BLOCKCHAIN_RPC_URL, SMART_CONTRACT_ADDRESS } from "../../env";

type RpcProvider = ethers.providers.JsonRpcProvider;
type SignerOrProvider = ethers.Signer | ethers.providers.Provider;
type Wallet = ethers.Wallet;

export function getProvider(): RpcProvider {
  return new ethers.providers.JsonRpcProvider(BLOCKCHAIN_RPC_URL);
}

export function getSigner(privateKey: string): Wallet {
  const provider = getProvider();
  return new ethers.Wallet(privateKey, provider);
}

export function getContract(signer?: SignerOrProvider): IzToken {
  const provider = getProvider();
  return IzToken__factory.connect(SMART_CONTRACT_ADDRESS!, signer || provider);
}

export async function getLatestBlockTimestamp(): Promise<number> {
  const provider = getProvider();
  const block = await provider.getBlock("latest");
  return block.timestamp;
}
