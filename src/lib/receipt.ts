import crypto from "crypto";

export function generateReceiptNumber(): string {
  const year = new Date().getFullYear();
  const hexSuffix = crypto.randomBytes(4).toString("hex").toUpperCase();
  return `JDS-${year}-${hexSuffix}`;
}
