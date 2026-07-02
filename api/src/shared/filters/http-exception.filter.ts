import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainException } from '../exceptions/domain.exception';

interface ErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  details?: Record<string, unknown>;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const errorResponse = this.buildErrorResponse(exception, request.url);

    if (errorResponse.statusCode >= 500) {
      this.logger.error(exception);
    } else {
      this.logger.warn(`${errorResponse.statusCode} ${errorResponse.message}`);
    }

    response.status(errorResponse.statusCode).json(errorResponse);
  }

  private buildErrorResponse(exception: unknown, path: string): ErrorResponse {
    const timestamp = new Date().toISOString();

    if (exception instanceof DomainException) {
      return {
        success: false,
        statusCode: exception.statusCode,
        message: exception.message,
        code: exception.code,
        timestamp,
        path,
        details: exception.details,
      };
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      const message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : ((exceptionResponse as Record<string, unknown>).message as string) ??
            exception.message;

      return {
        success: false,
        statusCode: status,
        message: Array.isArray(message) ? message.join(', ') : message,
        code: HttpStatus[status] ?? 'HTTP_EXCEPTION',
        timestamp,
        path,
      };
    }

    return {
      success: false,
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
      timestamp,
      path,
    };
  }
}
