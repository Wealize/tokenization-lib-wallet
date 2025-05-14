import { QR_CODE_PREFIX } from "../constants";
import { CitizenQRDataType, MerchantQRDataType } from "../types";

/**
 * Generates a QR code string for a Citizen DID.
 * @param didOrAddress - The DID (Decentralized Identifier) or address of the citizen (string).
 * @returns A formatted QR string with the CITIZEN prefix.
 */
export function generateCitizenQR(didOrAddress: string): string {
  const qr_prefix = QR_CODE_PREFIX.CITIZEN;

  return `${qr_prefix}-${didOrAddress}`;
}

/**
 * Generates a QR code string for a Merchant payment request.
 * @param walletAddress - The merchant's wallet address.
 * @param amount - The requested payment amount.
 * @param concept - The payment concept or description.
 * @returns A formatted QR string with the MERCHANT prefix and serialized data.
 */
export function generateMechantQR(
  walletAddress: string,
  amount: string,
  concept: string
): string {
  const qr_prefix = QR_CODE_PREFIX.MERCHANT;

  const data: MerchantQRDataType = {
    walletAddress,
    amount,
    concept,
  };

  const strData = JSON.stringify(data);

  return `${qr_prefix}-${strData}`;
}

/**
 * Parses a QR code string and determines whether it corresponds to a Merchant or Citizen QR.
 * @param qr - The scanned QR code string.
 * @returns The parsed QR data object (either MerchantQRDataType or CitizenQRDataType).
 * @throws If the QR prefix is invalid or the data format is incorrect.
 */
export function parseMerchOrCitizenQR(
  qr: string
): MerchantQRDataType | CitizenQRDataType {
  const [prefix, data] = qr.split("-", 2);

  if (prefix === QR_CODE_PREFIX.MERCHANT) {
    try {
      const parsed = JSON.parse(data);
      const { walletAddress, amount, concept } = parsed;

      if (!walletAddress || !amount || !concept) {
        throw new Error("Lib error: Missing fields in QR data");
      }

      return { walletAddress, amount, concept };
    } catch (err) {
      throw new Error("Lib error: Invalid QR data format");
    }
  } else if (prefix === QR_CODE_PREFIX.CITIZEN) {
    return { address: data };
  } else {
    throw new Error("Lib error: Invalid QR prefix");
  }
}
