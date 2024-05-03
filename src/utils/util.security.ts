import jwt, { JwtPayload } from "jsonwebtoken";
import * as crypto from "crypto";
import { Request } from "express";
import { JWT_SECRET_KEY, SALT } from "src/config";

export class SecurityUtil {
  static generateJsonwebtoken(userId: string): string {
    const payload = { user: userId };
    return jwt.sign(payload, JWT_SECRET_KEY);
  }

  static decodedJsonwebtoken(token: string): string {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
    return decoded.user as string;
  }

  static generateHashWithSalt(data: string): string {

    return crypto
      .createHash("sha512")
      .update(data + SALT)
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

  static isValidAuthorization(req: Request): boolean {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !/^Bearer [a-zA-Z0-9-._~+/]+$/i.test(authorizationHeader)) {
      return false;
    }
    const tokenLength = authorizationHeader.split(' ')[1].length;
    const expectedTokenLength = 167;
    return tokenLength === expectedTokenLength;
  }
}