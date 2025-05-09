export type RoleIdType = 0 | 1 | 2; // 0 = NONE, 1 = CITIZEN, 2 = MERCHANT

export const RolesType = {
  NONE: "NONE",
  CITIZEN: "CITIZEN",
  MERCHANT: "MERCHANT",
} as const;

export type ContractRoleType = (typeof RolesType)[keyof typeof RolesType];

// Benefit type codes (on-chain)
export type BenefitCodeType = "0x00" | "0x01" | "0x02"; // 0x00 = NONE, 0x01 = STATIONERY, 0x02 = GROCERY

export const BenefitLabelsType = {
  NONE: "NONE",
  STATIONERY: "STATIONERY",
  GROCERY: "GROCERY",
} as const;

export type BenefitsType =
  (typeof BenefitLabelsType)[keyof typeof BenefitLabelsType];

// Parsed QR result for merchant
export type MerchantQRDataType = {
  walletAddress: string;
  amount: string;
  concept: string;
};

// Benefit type codes (backend)
export type BenefitCodeTypeNum = RoleIdType; // 0 = NONE, 1 = STATIONERY, 2 = GROCERY

export type AidProductType = {
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
