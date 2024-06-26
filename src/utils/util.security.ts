import jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
import { JWT_SECRET_KEY, SALT } from 'src/config';

export class SecurityUtil {
  static generateJsonwebtoken<T extends object>(data: T, expiresIn?: string): string {
    const options: jwt.SignOptions = expiresIn ? { expiresIn } : {};
    return jwt.sign(data, JWT_SECRET_KEY, options);
  }

  static decodedJsonwebtoken<T extends object>(token: string): T {
    const decoded = jwt.verify(token, JWT_SECRET_KEY) as T;
    return decoded;
  }

  static generateHashWithSalt(data: string): string {
    return crypto
      .createHash('sha512')
      .update(data + SALT)
      .digest('hex');
  }

  static generateHashDigitalSignature(data: string): string {
    return crypto
      .createHash('sha512')
      .update(data + new Date() + SecurityUtil.genRandomBytes(64))
      .digest('hex');
  }

  static genRandomBytes(len: number): string {
    const buf = crypto.randomBytes(len);
    return buf.toString('hex');
  }


  static deleteSensiviteDataField<T extends Record<string, T>>(
    data: T,
    field: keyof T
  ): T {
    Reflect.deleteProperty(data, field);
    return data;
  }

  static strongPasswordRegex() {
    const pattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
    return pattern;
  }
}
