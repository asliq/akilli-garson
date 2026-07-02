import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from './domain-event.interface';

@Injectable()
export class DomainEventPublisher {
  private readonly logger = new Logger(DomainEventPublisher.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  publish(event: DomainEvent): void {
    this.logger.debug(`Publishing domain event: ${event.eventName}`);
    this.eventEmitter.emit(event.eventName, event);
  }

  publishAll(events: DomainEvent[]): void {
    events.forEach((event) => this.publish(event));
  }
}
