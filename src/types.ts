export type RoleIdType = 0 | 1 | 2; // 0 = NONE, 1 = CITIZEN, 2 = MERCHANT

// Benefit type codes (on-chain)
export type BenefitCodeType = "0x00" | "0x01" | "0x02"; // 0x00 = NONE, 0x01 = STATIONERY, 0x02 = GROCERY
// Benefit type codes (backend)
export type BenefitCodeTypeNum = 0 | 1 | 2; // 0 = NONE, 1 = STATIONERY, 2 = GROCERY

// Parsed QR result for merchant
export type MerchantQRDataType = {
  merchantDID: string;
  citizenDID: string;
  CID: string;
};

export type CitizenQRDataType = {
  address: string;
};

type AidProductType = {
  product_name: string;
  product_total_price: string;
};

export type TicketProcessingResultType = {
  payment_amount: string;
  aid_amount: string;
  aid_products: AidProductType[];
};

export type RNFileType = {
  uri: string;
  name: string;
  type: string;
};

export type TicketProcessingFileType = File | Blob | RNFileType;
