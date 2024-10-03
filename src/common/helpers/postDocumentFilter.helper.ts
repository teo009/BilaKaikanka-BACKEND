import { HttpException, HttpStatus } from '@nestjs/common';

export const postDocumentFiler = (
  request: Express.Request,
  document: Express.Multer.File,
  callBack: (error: Error | null, acceptFile: boolean) => void,
) => {
  const allowedMimeTypes = ['application/pdf'];

  //VALIDATE IF THERE IS NO DOCUMENT IN REQUEST
  if (!document)
    return callBack(
      new HttpException('No se ha enviado documento', HttpStatus.BAD_REQUEST),
      false,
    );

  //VALIDATE IF THE DOCUMENT IS PDF TYPE
  if (!allowedMimeTypes.includes(document.mimetype))
    return callBack(
      new HttpException(
        'Solo se permiten archivos PDF',
        HttpStatus.UNSUPPORTED_MEDIA_TYPE,
      ),
      false,
    );

  //ALL VALIDATIONS ARE GOOD
  callBack(null, true);
};
