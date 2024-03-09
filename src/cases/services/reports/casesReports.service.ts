import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RegionalCenter } from 'src/common/entities';

@Injectable()
export class CasesReportsService {
  constructor(private readonly dataSource: DataSource) {}

  async getCasesReports(parameters: { regionalCenter: string }) {
    try {
      const regionalCenter = await this.dataSource
        .getRepository(RegionalCenter)
        .createQueryBuilder('cur')
        .leftJoinAndSelect('cur.cases', 'case')
        .where('cur.regionalCenter = :regionalCenter', {
          regionalCenter: parameters.regionalCenter,
        })
        .getMany();
      return regionalCenter.length === 0
        ? {
            status: 'Error',
            detail: `No cases registered in ${parameters.regionalCenter} CUR`,
          }
        : regionalCenter;
    } catch (error) {
      console.log(error);
    }
  }

  /*
  async reporteModalidades(params: FiltroModalidadesDto) {
    const rows = this.dataSource
      .getRepository(LaboratoryUse)
      .createQueryBuilder('use')
      .leftJoin(Docentes, 'docente', 'docente.id = use.docenteId')
      .leftJoin(Asignatura, 'asignatura', 'asignatura.id = use.classNameId')
      .select([
        'docente.nombre as docente',
        'asignatura.nombre as asignatura',
        'extract(month from use.date) as mes',
        'extract(year from use.date) as anio',
        'SUM(use.hours) as horas',
      ])
      .groupBy(
        'docente.nombre, asignatura.nombre, extract(month from use.date), extract(year from use.date)',
      );

    // Primer where
    rows.where('use.id <> 0');

    // Agregando los filtros del reporte

    if (params.mes)
      rows.andWhere('extract(month from use.date) = :mes', {
        mes: params.mes,
      });

    if (params.anio)
      rows.andWhere('extract(year from use.date) = :anio', {
        anio: params.anio,
      });

    if (params.docente)
      rows.andWhere('use.docenteId = :docente', {
        docente: params.docente,
      });

    if (params.asignatura)
      rows.andWhere('use.classNameId = :asignatura', {
        asignatura: params.asignatura,
      });

    return await rows.getRawMany();
  }
  */
}
