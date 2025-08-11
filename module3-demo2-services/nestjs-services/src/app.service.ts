import { Injectable, Inject} from '@nestjs/common';
import Redis from 'ioredis';
import { Pool } from 'pg';
import { MetricsService } from './metrics/metrics.service';
 

@Injectable()
export class AppService {
  private db: Pool;

  constructor(
    @Inject('REDIS_CLIENT') private redis: Redis, 
    private readonly metrics: MetricsService) {
      this.db = new Pool({ connectionString: process.env.DATABASE_URL });
  }

  async getHello(): Promise<string> {
    const cached = await this.redis.get('hello');
    if (cached) {
      this.metrics.incrementRedisHitCounter();
      return `[CACHED] ${cached}`;
    }

    this.metrics.incrementRedisMissCounter();
    const value = 'Hello World';
    await this.redis.set('hello', value, 'EX', 30);
    return `[NEW] ${value}`;
  }

  async getDbTime(): Promise<string> {
    const result = await this.db.query('SELECT NOW()');
    return `Postgres Time: ${result.rows[0].now}`;
  }
}
