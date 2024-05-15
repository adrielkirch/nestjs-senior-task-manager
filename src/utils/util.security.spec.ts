import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import { Request } from "express";
import { SecurityUtil } from "src/utils/util.security";
import { JWT_SECRET_KEY, SALT } from "src/config";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

describe("SecurityUtil", () => {
  describe("generateJsonwebtoken", () => {
    it("should generate a JWT token", () => {
      // Test implementation
    });
  });

  describe("decodedJsonwebtoken", () => {
    it("should decode a JWT token", () => {
      // Test implementation
    });
  });

  describe("generateHashWithSalt", () => {
    it("should generate a hash with salt", () => {
      const data = "password";
      const expectedHash = "generatedHash";

      const generateHashWithSaltMock = jest.spyOn(SecurityUtil, "generateHashWithSalt");
      generateHashWithSaltMock.mockReturnValueOnce(expectedHash);

      const hash = SecurityUtil.generateHashWithSalt(data);

      expect(hash).toEqual(expectedHash);
      expect(generateHashWithSaltMock).toHaveBeenCalledWith(data);
    });
  });

  describe("generateHashDigitalSignature", () => {
    it("should generate a hash digital signature", () => {
      const data = "password";
      const expectedHash = "generatedHash";

      const generateHashSignatureMock = jest.spyOn(SecurityUtil, "generateHashDigitalSignature");
      generateHashSignatureMock.mockReturnValueOnce(expectedHash);

      const hash = SecurityUtil.generateHashDigitalSignature(data);

      expect(hash).toEqual(expectedHash);
      expect(generateHashSignatureMock).toHaveBeenCalledWith(data);
    });
  });

  describe("genRandomBytes", () => {
    it("should generate random bytes", () => {

      const expectedHash = "generatedHash";

      const generateHashSignatureMock = jest.spyOn(SecurityUtil, "genRandomBytes");
      generateHashSignatureMock.mockReturnValueOnce(expectedHash);

      const bytes = SecurityUtil.genRandomBytes(8);

      expect(bytes).toEqual(expectedHash);
    });
  });

  describe("deleteSensiviteDataField", () => {
    it("should remove a specified field from an object", () => {

      const data: Record<string, any> = { id: 123, username: "user123", password: "password123" };
      const fieldToRemove = "password";


      const result = SecurityUtil.deleteSensiviteDataField(data, fieldToRemove);


      expect(result).toEqual({ id: 123, username: "user123" });
      expect(result).not.toHaveProperty(fieldToRemove);
    });

    it("should return the original object if field doesn't exist", () => {

      const data: Record<string, any> = { id: 123, username: "user123" };
      const fieldToRemove = "password";


      const result = SecurityUtil.deleteSensiviteDataField(data, fieldToRemove);
      expect(result).toEqual(data);
    });
  });

  describe("strongPasswordRegex", () => {
    it("should check if password is valid", () => {
      const password = "Password123!";
      const regex = SecurityUtil.strongPasswordRegex();
      const match = password.match(regex);
      expect(match).not.toBeNull();
    });
  });
});
