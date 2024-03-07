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
      if (data === null)
        this.handleDBExceptions({
          code: '23503',
          detail: `Register with "id: ${id}" was not found in ${repository.target}`,
        });
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
      /*default:
        // Manejar cualquier otro error de base de datos
        const errorMessage = error.detail || error.message || 'Error desconocido de base de datos';
        throw new Error(errorMessage);*/
    }
  }
}
