import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { MetricsService } from './metrics/metrics.service';
import type { Response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly metrics: MetricsService
  ) {}

  @Get('/')
  getHelloNoCache(): string {
    return 'Hello World!';
  }


  @Get('/cache')
  getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('/db')
  getDbTime(): Promise<string> {
    return this.appService.getDbTime();
  }

  @Get('/metrics')
  async getMetrics(@Res() res: Response) {
    res.setHeader('Content-Type', this.metrics.getRegistry().contentType);
    res.send(await this.metrics.getRegistry().metrics());
  }
}
