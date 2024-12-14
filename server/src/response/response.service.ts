import { HttpStatus, Injectable } from '@nestjs/common';
import { BaseResponse } from './dto';

@Injectable()
export class ResponseService {
  create(id): BaseResponse {
    return {
      message: '',
      status: HttpStatus.CREATED,
      success: true,
      id,
    };
  }
  findAll(data): BaseResponse {
    return {
      message: 'Find all',
      status: HttpStatus.CREATED,
      success: true,
      data,
    };
  }
  findOne(data): BaseResponse {
    return {
      message: '',
      status: HttpStatus.ACCEPTED,
      success: true,
      data,
    };
  }
  update(id): BaseResponse {
    return {
      message: 'This data is updated successfully',
      status: HttpStatus.CREATED,
      success: true,
      id,
    };
  }
  remove(id): BaseResponse {
    return {
      message: '',
      status: HttpStatus.CREATED,
      success: true,
      id,
    };
  }
}
