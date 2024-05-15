import { Test, TestingModule } from '@nestjs/testing';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { SecurityUtil } from 'src/utils/util.security';
import { DefaultMiddleware } from 'src/middlewares/default.middleware';

describe('DefaultMiddleware', () => {
  let middleware: DefaultMiddleware;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultMiddleware],
    }).compile();

    middleware = module.get<DefaultMiddleware>(DefaultMiddleware);
  });

  it('should throw UnauthorizedException if authorization token is missing', () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    expect(() => middleware.use(req, res, next)).toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if authorization token is invalid', () => {
    const req = { headers: { authorization: 'Bearer invalidToken' } } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    expect(() => middleware.use(req, res, next)).toThrow(UnauthorizedException);
  });

  it('should set user and role in request if authorization token is valid', () => {
    const validToken = 'validToken';
    const decodedData = { user: 'testUser', role: 'admin' };

    jest.spyOn(SecurityUtil, 'decodedJsonwebtoken').mockReturnValue(decodedData);

    const req = { headers: { authorization: `Bearer ${validToken}` } } as Request;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    middleware.use(req, res, next);

    expect(req.user).toEqual(decodedData.user);
    expect(req.role).toEqual(decodedData.role);
    expect(next).toHaveBeenCalled();
  });
});
