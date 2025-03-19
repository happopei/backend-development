import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from './constants';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, 
    private i18n: I18nService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log("required Roles:", requiredRoles);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // If no roles are required, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const region = user.attributes?.region || 'us';
    
    // console.log("Roles guard:", user);
    console.log(region);
    if (!user || !user.role) {
      throw new ForbiddenException('Access denied: No role assigned');
    }

    // Authorization logic based on user attributes
    if (this.isUserAuthorized(user, region)) {
        return true;
    }
    else {
      const translations = await this.i18n.getTranslations();
      console.log("Translations", translations);
      // Load region-specific message using i18n
      const message = this.i18n.translate('abac.restriction', { lang: 'us' });
      throw new ForbiddenException(`Access Forbidden:  ${message}`);
    }
    // const hasRole = requiredRoles.includes(user.role as UserRole);
    // if (!hasRole) {
    //   throw new ForbiddenException(`Access denied: Role '${user.role}' not allowed`);
    // }

    // return true;
  }

  private isUserAuthorized(user: any, region: any): boolean {
    return region !== 'us';
  }
}
