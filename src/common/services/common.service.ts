import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class CommonService {
  constructor() {}

  async getOne(id: string, repository: any): Promise<any> {
    //let data: object;
    try {
      const data = await repository.findOneBy({ id });
      return data;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  handleDBExceptions(error: any): void {
    switch (error.code) {
      case '23505': //repeated registration
        throw new BadRequestException(error.detail);
      case '23503': //Not found
        throw new NotFoundException(error.detail);
      case '23502': //Null value in a column
        throw new BadRequestException(
          `Null value in column (${error.column}) of relation (${error.table}), violates not-null constrain`,
        );
      case undefined:
        throw new NotFoundException(error.message);
    }
  }
}
