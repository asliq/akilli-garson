import { DomainEvent } from '@/core/events/domain-event.interface';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';

export function publishDomainEvents(
  publisher: DomainEventPublisher,
  events: DomainEvent[],
): void {
  for (const event of events) {
    publisher.publish(event);
  }
}
