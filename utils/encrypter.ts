import CryptoJS from "crypto-js";

export const encryptUserId = (userId: string) => {
    const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;
    return encodeURIComponent(CryptoJS.AES.encrypt(userId.toString(), secretKey).toString());
}

export const decryptUserId = (encryptedID: string) => {
    const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_KEY!;
    const bytes = CryptoJS.AES.decrypt(encryptedID, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}