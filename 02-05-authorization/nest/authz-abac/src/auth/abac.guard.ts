// guards/abac.guard.ts

import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccountService } from '../account/account.service';
import { UserRole } from './constants';

@Injectable()
export class ABACGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // If no roles are required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      throw new ForbiddenException('Access denied: No role assigned');
    }

    const hasRole = requiredRoles.includes(user.role as UserRole);
    if (!hasRole) {
      throw new ForbiddenException(`Access denied: Role '${user.role}' not allowed`);
    }

    if (!this.isWeekday()) {
      throw new ForbiddenException(`Access denied: Not allowed to access during outside weekday.`);
    }

    return true;
  }

  isWeekday(): boolean {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday

    // Check if day is between Monday (1) and Friday (5) inclusive
    return dayOfWeek >= 1 && dayOfWeek <= 6;
  }
}