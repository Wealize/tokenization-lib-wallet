declare const QR_CODE_PREFIX: {
    CITIZEN: string;
    MERCHANT: string;
};

type RoleIdType = 0 | 1 | 2;
declare const RolesType: {
    readonly NONE: "NONE";
    readonly CITIZEN: "CITIZEN";
    readonly MERCHANT: "MERCHANT";
};
type ContractRoleType = (typeof RolesType)[keyof typeof RolesType];
type BenefitCodeType = "0x00" | "0x01" | "0x02";
declare const BenefitLabelsType: {
    readonly NONE: "NONE";
    readonly STATIONERY: "STATIONERY";
    readonly GROCERY: "GROCERY";
};
type BenefitsType = (typeof BenefitLabelsType)[keyof typeof BenefitLabelsType];
type MerchantQRDataType = {
    walletAddress: string;
    amount: string;
    concept: string;
};
type BenefitCodeTypeNum = RoleIdType;
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

declare function generateCitizenQR(did: string): string;
declare function generateMechantQR(walletAddress: string, amount: string, concept: string): string;
declare function parseMerchantQR(qr: string): MerchantQRDataType;

declare function getTokenBalance(address: string): Promise<string>;
declare function getCitizenBenefitsType(address: string): Promise<BenefitsType>;
declare function getPartyPermission(address: string): Promise<ContractRoleType>;
declare function sendTokens(privateKey: string, toAddress: string, amount: number, eventData?: string): Promise<string>;
declare function burnTokens(privateKey: string, amount: number, eventData?: string): Promise<string>;

declare function processTicketImage(aid_id: BenefitCodeTypeNum, imageFile: TicketProcessingFileType, authorization: string): Promise<TicketProcessingResultType>;

type EnvVarsType = {
    BACK_END_URL: string;
    BLOCKCHAIN_RPC_URL: string;
    SMART_CONTRACT_ADDRESS: string;
};
declare function initTokenizationLibEnvVars(newVars: Partial<EnvVarsType>): void;

export { type AidProductType, type BenefitCodeType, type BenefitCodeTypeNum, BenefitLabelsType, type BenefitsType, type ContractRoleType, type MerchantQRDataType, QR_CODE_PREFIX, type RNFileType, type RoleIdType, RolesType, type TicketProcessingFileType, type TicketProcessingResultType, burnTokens, generateCitizenQR, generateMechantQR, getCitizenBenefitsType, getPartyPermission, getTokenBalance, initTokenizationLibEnvVars, parseMerchantQR, processTicketImage, sendTokens };
