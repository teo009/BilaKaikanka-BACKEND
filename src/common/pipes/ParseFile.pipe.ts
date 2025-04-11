import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { FileValidator } from '@nestjs/common';

class MaxFileSizeValidator extends FileValidator<{ maxSize: number }> {
  constructor(options: { maxSize: number }) {
    super(options);
  }

  isValid(file: Express.Multer.File): boolean {
    return file.size <= this.validationOptions.maxSize;
  }

  buildErrorMessage(): string {
    return `El tamaño del archivo no debería de exceder ${this.validationOptions.maxSize} bytes`;
  }
}

@Injectable()
export class ParseFilePipe implements PipeTransform {
  transform(file: Express.Multer.File) {

    const maxSizeValidator = new MaxFileSizeValidator({ maxSize: 5000000 }); // 5MB
    if (!maxSizeValidator.isValid(file)) {
      throw new BadRequestException(maxSizeValidator.buildErrorMessage());
    }
    return file;
  }
}
