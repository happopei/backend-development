import { Controller, Get } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';

@Controller()
export class AppController {
  constructor() { }

  @Get()
  async getRestricted(@I18n() i18n: I18nContext): Promise<any> {
    if ("allowed" != "allowed") {
      return { "account": "this is your account" }
    }

    return { "message": i18n.t('message.RESTRICTED_RESOURCE', { lang: I18nContext.current().lang }) };
  }
}
