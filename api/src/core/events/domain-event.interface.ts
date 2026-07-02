export interface DomainEvent {
  readonly eventName: string;
  readonly occurredAt: Date;
  readonly payload: Record<string, unknown>;
}

export abstract class DomainEventBase implements DomainEvent {
  readonly occurredAt = new Date();

  constructor(public readonly payload: Record<string, unknown> = {}) {}

  abstract get eventName(): string;
}
