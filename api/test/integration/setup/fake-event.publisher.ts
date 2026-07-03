import { DomainEvent } from '@/core/events/domain-event.interface';
import { DomainEventPublisher } from '@/core/events/domain-event.publisher';

export class FakeEventPublisher implements Pick<DomainEventPublisher, 'publish' | 'publishAll'> {
  readonly publishedEvents: DomainEvent[] = [];

  publish(event: DomainEvent): void {
    this.publishedEvents.push(event);
  }

  publishAll(events: DomainEvent[]): void {
    events.forEach((event) => this.publish(event));
  }

  clear(): void {
    this.publishedEvents.length = 0;
  }

  findByEventName(eventName: string): DomainEvent[] {
    return this.publishedEvents.filter((event) => event.eventName === eventName);
  }
}
