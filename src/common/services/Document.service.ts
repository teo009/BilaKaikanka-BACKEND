import * as fs from 'fs';
import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Document } from '../entities';
import { CommonService } from './common.service';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly DocumentRepository: Repository<Document>,
    private readonly commonService: CommonService,
  ) {}

  async createDocument(documentName: string): Promise<Document> {
    try {
      const response = this.DocumentRepository.create({ name: documentName });
      return await this.DocumentRepository.save(response);
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }

  getStaticDocument(documentName: string) {
    const documentPath = join(
      __dirname,
      '../../../static/politics',
      `${documentName}.pdf`,
    );
    if (!fs.existsSync(documentPath))
      throw new BadRequestException(
        `No se encotró documento con el nombre ${documentName}`,
      );
    return documentPath;
  }

  async getAllTheDocuments() {
    try {
      const response = await this.DocumentRepository.find();
      if (response.length === 0) {
        this.commonService.handleDBExceptions({
          code: '23503',
          detail:
            'Documentos no encontrados | parece que no hay registros por acá',
        });
      }
      return response;
    } catch (error) {
      this.commonService.handleDBExceptions(error);
    }
  }
}
