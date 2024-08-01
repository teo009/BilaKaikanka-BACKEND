export const postDocumentFiler = (
  request: Express.Request,
  document: Express.Multer.File,
  // eslint-disable-next-line @typescript-eslint/ban-types
  callBack: Function,
) => {
  if (!document)
    return callBack(new Error('No se ha enviado documento'), false);
  const fileExtension = document.mimetype.split('/')[1];
  fileExtension === 'pdf' ? callBack(null, true) : callBack(null, false);
};
