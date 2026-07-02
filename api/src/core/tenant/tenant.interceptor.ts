import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tenantStorage } from './tenant.context';

/**
 * Placeholder tenant interceptor — JWT entegrasyonu sonrası restaurantId buradan set edilecek.
 * Şimdilik X-Restaurant-Id header'ından okur (geliştirme amaçlı).
 */
@Injectable()
export class TenantInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<{ headers: Record<string, string> }>();
    const restaurantId = request.headers['x-restaurant-id'];

    if (!restaurantId) {
      return next.handle();
    }

    return tenantStorage.run({ restaurantId }, () => next.handle());
  }
}
