import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { PrismaModule } from './database/prisma.module';
import { LoggerModule } from './logging/logger.module';
import { RedisModule } from './cache/redis.module';
import { QueueModule } from './queue/queue.module';
import { EventModule } from './events/event.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [
    AppConfigModule,
    LoggerModule,
    PrismaModule,
    RedisModule,
    QueueModule,
    EventModule,
    TenantModule,
  ],
  exports: [
    AppConfigModule,
    LoggerModule,
    PrismaModule,
    RedisModule,
    QueueModule,
    EventModule,
    TenantModule,
  ],
})
export class CoreModule {}
