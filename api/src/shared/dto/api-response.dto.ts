export class ApiResponseDto<T = unknown> {
  success!: boolean;
  statusCode!: number;
  message!: string;
  data?: T;
  timestamp!: string;
  path!: string;
}
