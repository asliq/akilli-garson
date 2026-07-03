import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HealthModule } from './modules/health/health.module';
import { MenuModule } from './modules/menu/menu.module';
import { PublicModule } from './modules/public/public.module';

@Module({
  imports: [CoreModule, SharedModule, HealthModule, MenuModule, PublicModule],
})
export class AppModule {}
