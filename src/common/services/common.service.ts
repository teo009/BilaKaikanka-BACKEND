import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  constructor() {}

  async getOne(id: string, repository: any): Promise<any> {
    let data: object;
    try {
      data = await repository.findOneBy({ id });
      if (data === null)
        throw new Error('No data found in: ' + repository.target);
    } catch (error) {
      this.handleDBExceptions(error);
    }
    return data;
  }

  handleDBExceptions(error: any): void {
    switch (error.code) {
      case '23505': //repeated registration
        throw new BadRequestException(error.detail);
      case '23503': //Not found
        throw new NotFoundException(error.detail);
      case undefined:
        throw new NotFoundException(error.message);
    }
  }
}
