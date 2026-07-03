import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HealthModule } from './modules/health/health.module';
import { MenuModule } from './modules/menu/menu.module';

@Module({
  imports: [CoreModule, SharedModule, HealthModule, MenuModule],
})
export class AppModule {}
