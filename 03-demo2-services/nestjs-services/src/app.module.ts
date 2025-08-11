import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RedisModule } from './redis/redis.module';
import { MetricsModule } from './metrics/metrics.module';

@Module({
  imports: [RedisModule, MetricsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
