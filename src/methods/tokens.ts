import { ethers } from "ethers";
import {
  getContract,
  getLatestBlockTimestamp,
  getSigner,
} from "../utils/contract";
import {
  ContractRoleType,
  RoleIdType,
  RolesType,
  BenefitCodeType,
  BenefitLabelsType,
  BenefitsType,
} from "../types";

export async function getTokenBalance(address: string): Promise<string> {
  const contract = getContract();
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatUnits(balance, 18);
}

export async function getCitizenBenefitsType(
  address: string
): Promise<BenefitsType> {
  const contract = getContract();
  const benefit = (await contract.getAttachedData(address)) as BenefitCodeType;

  const BENEFIT_MAP: Record<BenefitCodeType, BenefitsType> = {
    "0x00": BenefitLabelsType.NONE,
    "0x01": BenefitLabelsType.STATIONERY,
    "0x02": BenefitLabelsType.GROCERY,
  };

  return BENEFIT_MAP[benefit] ?? BenefitLabelsType.NONE;
}

export async function getPartyPermission(
  address: string
): Promise<ContractRoleType> {
  const contract = getContract();
  const timestamp = await getLatestBlockTimestamp();
  const role = await contract.partyPermission(address, timestamp);

  const ROLES_MAP: Record<RoleIdType, ContractRoleType> = {
    0: RolesType.NONE,
    1: RolesType.CITIZEN,
    2: RolesType.MERCHANT,
  };

  return ROLES_MAP[role as RoleIdType] ?? RolesType.NONE;
}

export async function sendTokens(
  privateKey: string,
  toAddress: string,
  amount: number,
  eventData?: string
): Promise<string> {
  const signer = getSigner(privateKey);
  const contract = getContract(signer);
  const fromAddress = await signer.getAddress();
  const parsedAmount = ethers.utils.parseUnits(amount.toString(), 18);
  const data = eventData ? ethers.utils.toUtf8Bytes(eventData) : "0x00";

  try {
    const tx = await contract.transferFromWithData(
      fromAddress,
      toAddress,
      parsedAmount,
      data
    );
    return tx.hash;
  } catch (error) {
    const e = error as any;
    console.error(e);

    const message =
      e.reason || e.data?.message || e.message || "Unknown transaction error";
    throw new Error(`Transaction Error: ${message}`);
  }
}

export async function burnTokens(
  privateKey: string,
  amount: number,
  eventData?: string
): Promise<string> {
  const signer = getSigner(privateKey);
  const contract = getContract(signer);
  const address = await signer.getAddress();
  const parsedAmount = ethers.utils.parseUnits(amount.toString(), 18);
  const data = eventData ? ethers.utils.toUtf8Bytes(eventData) : "0x00";

  try {
    const tx = await contract.redeemFrom(address, parsedAmount, data);
    return tx.hash;
  } catch (error) {
    const e = error as any;
    console.error(e);

    const message =
      e.reason || e.data?.message || e.message || "Unknown Burn Tokens error";
    throw new Error(`Burn Tokens Error: ${message}`);
  }
}
