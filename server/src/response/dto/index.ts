import { HttpStatus } from '@nestjs/common';

export class BaseResponse {
  success: boolean;
  status: HttpStatus;
  message: string;
  data?: any | any[];
  id?: number | string;
}
