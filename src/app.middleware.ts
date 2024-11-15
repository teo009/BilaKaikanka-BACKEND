import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class appMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const apiKeyConfig: string = this.configService.get('API_KEY');
    const apiKeyHeader: string = req.headers['api-key'];

    if (apiKeyConfig === apiKeyHeader) next();
    if (apiKeyConfig !== apiKeyHeader || !apiKeyHeader)
      res.status(401).json({ message: 'No autorizado' });
  }
}
