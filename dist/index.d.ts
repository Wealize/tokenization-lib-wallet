declare const QR_CODE_PREFIX: {
    CITIZEN: string;
    MERCHANT: string;
};

type RoleIdType = 0 | 1 | 2;
type BenefitCodeType = "0x00" | "0x01" | "0x02";
type BenefitCodeTypeNum = 0 | 1 | 2;
type MerchantQRDataType = {
    walletAddress: string;
    amount: string;
    concept: string;
};
type CitizenQRDataType = {
    address: string;
};
type AidProductType = {
    product_name: string;
    product_total_price: string;
};
type TicketProcessingResultType = {
    payment_amount: string;
    aid_amount: string;
    aid_products: AidProductType[];
};
type RNFileType = {
    uri: string;
    name: string;
    type: string;
};
type TicketProcessingFileType = File | Blob | RNFileType;

/**
 * Generates a QR code string for a Citizen DID.
 * @param didOrAddress - The DID (Decentralized Identifier) or address of the citizen (string).
 * @returns A formatted QR string with the CITIZEN prefix.
 */
declare function generateCitizenQR(didOrAddress: string): string;
/**
 * Generates a QR code string for a Merchant payment request.
 * @param walletAddress - The merchant's wallet address.
 * @param amount - The requested payment amount.
 * @param concept - The payment concept or description.
 * @returns A formatted QR string with the MERCHANT prefix and serialized data.
 */
declare function generateMechantQR(walletAddress: string, amount: string, concept: string): string;
/**
 * Parses a QR code string and determines whether it corresponds to a Merchant or Citizen QR.
 * @param qr - The scanned QR code string.
 * @returns The parsed QR data object (either MerchantQRDataType or CitizenQRDataType).
 * @throws If the QR prefix is invalid or the data format is incorrect.
 */
declare function parseMerchOrCitizenQR(qr: string): MerchantQRDataType | CitizenQRDataType;

/**
 * Retrieves the token balance of a given address.
 * @param address - The wallet address to query.
 * @returns The token balance formatted as a string.
 */
declare function getTokenBalance(address: string): Promise<string>;
/**
 * Retrieves the benefit type code assigned to a citizen's address.
 * @param address - The citizen's wallet address.
 * @returns The benefit code as a hexadecimal string.
 */
declare function getCitizenBenefitsType(address: string): Promise<BenefitCodeType>;
/**
 * Retrieves the permission role assigned to an address at the latest block timestamp.
 * @param address - The user's wallet address.
 * @returns The role ID associated with the address.
 */
declare function getPartyPermission(address: string): Promise<RoleIdType>;
/**
 * Transfers tokens from the user's wallet to another address.
 * Uses `transferFromWithData` to attach additional event data.
 * @param privateKey - The sender's private key.
 * @param toAddress - The recipient's wallet address.
 * @param amount - The amount of tokens to transfer.
 * @param eventData - Optional event data to attach.
 * @returns The transaction hash of the transfer.
 */
declare function sendTokens(privateKey: string, toAddress: string, amount: number, eventData?: string): Promise<string>;
/**
 * Burns (redeems) a specific amount of tokens from the user's wallet.
 * @param privateKey - The wallet's private key.
 * @param amount - The amount of tokens to burn.
 * @param eventData - Optional event data to attach.
 * @returns The transaction hash of the burn operation.
 */
declare function burnTokens(privateKey: string, amount: number, eventData?: string): Promise<string>;

declare function processTicketImage(aid_id: BenefitCodeTypeNum, imageFile: TicketProcessingFileType, authorization: string): Promise<TicketProcessingResultType>;

type EnvVarsType = {
    BACK_END_URL: string;
    BLOCKCHAIN_RPC_URL: string;
    SMART_CONTRACT_ADDRESS: string;
};
declare function initTokenizationLibEnvVars(newVars: Partial<EnvVarsType>): void;

export { type BenefitCodeType, type BenefitCodeTypeNum, type CitizenQRDataType, type MerchantQRDataType, QR_CODE_PREFIX, type RNFileType, type RoleIdType, type TicketProcessingFileType, type TicketProcessingResultType, burnTokens, generateCitizenQR, generateMechantQR, getCitizenBenefitsType, getPartyPermission, getTokenBalance, initTokenizationLibEnvVars, parseMerchOrCitizenQR, processTicketImage, sendTokens };
