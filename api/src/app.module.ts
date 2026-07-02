import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [CoreModule, SharedModule, HealthModule],
})
export class AppModule {}
