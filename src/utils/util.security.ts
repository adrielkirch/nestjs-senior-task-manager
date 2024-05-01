import jwt, { JwtPayload } from "jsonwebtoken"; 
import * as crypto from "crypto";

export class SecurityUtil {
  static generateJsonwebtoken(userId: string): string {
    const payload = { user: userId };
    return jwt.sign(payload, process.env.JWT_SECRET_KEY);
  }

  static decodedJsonwebtoken(token: string): string {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as JwtPayload;
    return decoded.user as string;
  }

  static generateHashWithSalt(data: string): string {
    
    return crypto
      .createHash("sha512")
      .update(data + process.env.SALT) 
      .digest("hex");
  }

  static generateHashDigitalSignature(data: string): string {
    return crypto
      .createHash("sha512")
      .update(data + new Date() + SecurityUtil.genRandomBytes(64)) 
      .digest("hex");
  }

  private static genRandomBytes(len: number): string {
    const buf = crypto.randomBytes(len);
    return buf.toString("hex");
  }

  static sensiviteDataField(data: any, field: string): any {
    delete data[field];
    return data;
  }
}