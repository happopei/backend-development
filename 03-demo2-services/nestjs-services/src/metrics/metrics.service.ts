import { Injectable } from '@nestjs/common';
import { collectDefaultMetrics, Registry, Counter } from 'prom-client';


@Injectable()
export class MetricsService {
  private readonly registry = new Registry();

  private readonly redisHitCounter: Counter<string>;
  private readonly redisMissCounter: Counter<string>;

  constructor() {
    // Include default Node.js metrics (CPU, memory, event loop)
    collectDefaultMetrics({ register: this.registry });


    this.redisHitCounter = new Counter({
      name: 'redis_hits_total',
      help: 'Redis cache hits',
      registers: [this.registry],
    });

    this.redisMissCounter = new Counter({
      name: 'redis_misses_total',
      help: 'Redis cache misses',
      registers: [this.registry],
    });
  }

  getRegistry(){
    return this.registry;
  }
  
  incrementRedisHitCounter() {
    this.redisHitCounter.inc();
  }
    
  incrementRedisMissCounter() {
    this.redisMissCounter.inc();
  }

}
