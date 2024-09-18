//import { v4 as uuid } from "uuid";

export const documentNamer = (
  req: Express.Request,
  document: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callback: Function,
) => {
  if (!document) return callback(new Error('Documento vacío'), false);
  const documentExtension = document.mimetype.split('/')[1];
  const documentName = document.originalname.split('.')[0];
  const documentFullName = `${documentName}.${documentExtension}`;
  callback(null, documentFullName);
};
