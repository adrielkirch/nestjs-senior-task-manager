import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { PermissionGuard } from 'src/middlewares/permissions.guard';
import { RoleEnum } from 'src/domain/role/types';

describe('PermissionGuard', () => {
  let guard: PermissionGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionGuard],
    }).compile();

    guard = module.get<PermissionGuard>(PermissionGuard);
  });

  it('should allow access if user has sufficient permissions', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          role: RoleEnum.ADMIN,
          method: 'GET',
          url: '/users',
        }),
      }),
    } as ExecutionContext;

    const canActivate = guard.canActivate(mockContext);

    expect(canActivate).toBe(true);
  });

  it('should throw ForbiddenException if user does not have sufficient permissions', () => {
    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          role: RoleEnum.GUEST,
          method: 'DELETE',
          url: '/tasks/remove',
        }),
      }),
    } as ExecutionContext;

    expect(() => guard.canActivate(mockContext)).toThrow(ForbiddenException);
  });

});
