import { DomainException } from './domain.exception';

export class ConflictException extends DomainException {
  constructor(message: string, details?: Record<string, unknown>) {
    super(message, 'CONFLICT', 409, details);
    this.name = 'ConflictException';
  }
}
