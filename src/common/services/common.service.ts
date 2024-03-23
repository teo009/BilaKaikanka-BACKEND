import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import jsPDF from 'jspdf';

@Injectable()
export class CommonService {
  constructor() {}

  generatePdf(caseData) {
    const pdf = new jsPDF();
    const xOffSet = pdf.internal.pageSize.width / 2;
    const occurrenceDate = new Date(caseData.occurrence_date);
    const receptionDate = new Date(caseData.reception_date);

    pdf.setLineWidth(0.1);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('UNIVERSIDAD DE LAS REGIONES AUTONOMAS DE LA COSTA', xOffSet, 20, {
      align: 'center',
    });
    pdf.text('CARIBE NICARAGUENSE', xOffSet, 24, { align: 'center' });
    pdf.text('URACCAN', xOffSet, 28, { align: 'center' });
    pdf.setFont(undefined, 'normal');
    pdf.text('FORMATO DE RECEPCION DEL CASO', xOffSet, 34, { align: 'center' });
    pdf.setFont('helvetica');
    pdf.rect(10, 38, pdf.internal.pageSize.width - 20, 14);
    pdf.text('DATOS GENERALES', xOffSet, 43, { align: 'center' });
    pdf.text(`Numero de expediente: ${caseData.code}`, 40, 49);
    pdf.text(`Numero de caso: ${caseData.number}`, 124, 49);
    pdf.text('FECHA DE OCURRENCIA:', 10, 58);
    pdf.text(
      `Dia: ${this.handleDateDaysToString(occurrenceDate.getDay())}`,
      60,
      58,
    );
    pdf.text(`Fecha: ${occurrenceDate.getDate()}`, 90, 58);
    pdf.text(`Mes: ${occurrenceDate.getMonth() + 1}`, 114, 58);
    pdf.text(`Anio: ${occurrenceDate.getFullYear()}`, 150, 58);
    pdf.text(
      `Hora: ${occurrenceDate.getHours()}:${occurrenceDate.getMinutes()}`,
      177,
      58,
    );
    pdf.text('FECHA DE RECEPCION:', 10, 64);
    pdf.text(
      `Dia: ${this.handleDateDaysToString(receptionDate.getDay())}`,
      60,
      64,
    );
    pdf.text(`Fecha: ${receptionDate.getDate()}`, 90, 64);
    pdf.text(`Mes: ${receptionDate.getMonth() + 1}`, 114, 64);
    pdf.text(`Anio: ${receptionDate.getFullYear()}`, 150, 64);
    pdf.text(
      `Hora: ${receptionDate.getHours()}:${receptionDate.getMinutes()}`,
      177,
      64,
    );

    pdf.rect(10, 68, pdf.internal.pageSize.width - 20, 26);
    pdf.text('DENUNCIANTE', xOffSet, 73, { align: `center` });
    caseData.person.map((person) => {
      if (person.role_in_case === 'Denunciante') {
        pdf.text(
          `Nombres y apellidos: ${person.firstName} ${person.secondName}`,
          12,
          79,
        );
        pdf.text(`Numero de telefono/s: ${person.phoneNumbers}`, 93, 79);
        pdf.text(`Edad: (20) anios`, 174, 79);
        pdf.text(`Cedula: ${person.identity}`, 12, 85);
        pdf.text(`Etnia: (Mestiza)`, 70, 85);
        pdf.text(`Sexo: ${person.gender}`, 110, 85);
        pdf.text(`Preferencia sexual: (Femenino)`, 151, 85);
        pdf.text(
          `Procedencia / direccion: ${person.homeAddress}`,
          xOffSet,
          91,
          { align: `center` },
        );
      }
    });

    pdf.rect(10, 96, pdf.internal.pageSize.width - 20, 50);
    pdf.text('VICTIMA', xOffSet, 101, { align: `center` });
    caseData.person.map((person) => {
      if (person.role_in_case === 'Victima') {
        pdf.text(
          `Nombres y apellidos: ${person.firstName} ${person.secondName}`,
          12,
          107,
        );
        pdf.text(`Numero de telefono/s: ${person.phoneNumbers}`, 93, 107);
        pdf.text(`Edad: (20) anios`, 174, 107);
        pdf.text(`Cedula: ${person.identity}`, 12, 113);
        pdf.text(`Etnia: (Mestiza)`, 70, 113);
        pdf.text(`Sexo: ${person.gender}`, 110, 113);
        pdf.text(`Preferencia sexual: (Femenino)`, 151, 113);
        pdf.text(`Estado civil: (Union libre)`, 12, 119);
        pdf.text(
          `Nivel academico: ${person.academicLevel.academicLevel}`,
          60,
          119,
        );
        pdf.text(`Carrera y anio: (Ingenieria en Sistemas, II)`, 118, 119);
        pdf.text(
          `Centro de trabajo y cargo: ${person.workplace}, (contador)`,
          12,
          125,
        );
        pdf.text(
          `Tipo de violencia: ${person.violenceType.violenceType}`,
          128,
          125,
        );
        pdf.text(
          `Parentezco y/o relacion con el agresor: ${person.victimRelationship}`,
          90,
          137,
        );
        pdf.text(
          `Procedencia / direccion: ${person.homeAddress}`,
          xOffSet,
          143,
          { align: `center` },
        );
      }
    });
    pdf.text(`Lugar ocurrencia: ${caseData.place_of_events}`, 12, 131);
    pdf.text(`Tiempo ocurrencia: ${caseData.occurrence_time}`, 12, 137);

    pdf.rect(10, 148, pdf.internal.pageSize.width - 20, 50);
    pdf.text('PRESUNTO VICTIMARIO', xOffSet, 153, { align: `center` });
    caseData.person.map((person) => {
      if (person.role_in_case === 'Agresor') {
        pdf.text(
          `Nombres y apellidos: ${person.firstName} ${person.secondName}`,
          12,
          159,
        );
        pdf.text(`Numero de telefono/s: ${person.phoneNumbers}`, 93, 159);
        pdf.text(`Edad: (20) anios`, 174, 159);
        pdf.text(`Cedula: ${person.identity}`, 12, 165);
        pdf.text(`Etnia: (Mestiza)`, 70, 165);
        pdf.text(`Sexo: ${person.gender}`, 110, 165);
        pdf.text(`Preferencia sexual: (Femenino)`, 151, 165);
        pdf.text(`Estado civil: (Union libre)`, 12, 171);
        pdf.text(
          `Nivel academico: ${person.academicLevel.academicLevel}`,
          60,
          171,
        );
        pdf.text(`Carrera y anio: (Ingenieria en Sistemas, II)`, 118, 171);
        pdf.text(
          `Centro de trabajo y cargo: ${person.workplace}, contadora`,
          12,
          177,
        );
        pdf.text(`Tipo de violencia: ${person.violenceType}`, 128, 177);
        pdf.text(
          `Parentezco y/o relacion con el victimario: ${person.victimRelationship}`,
          90,
          189,
        );
        pdf.text(
          `Procedencia / direccion: ${person.homeAddress}`,
          xOffSet,
          195,
          { align: `center` },
        );
      }
    });
    pdf.text(`Lugar ocurrencia: ${caseData.place_of_events}`, 12, 183);
    pdf.text(`Tiempo ocurrencia: ${caseData.occurrence_time}`, 12, 189);

    pdf.text(`NARRACION DE LOS HECHOS: ${caseData.narration}`, 10, 204, {
      align: 'justify',
      maxWidth: pdf.internal.pageSize.width - 22,
    });
    pdf.text(`Recepcion:`, 10, 270);
    pdf.line(30, 270, 86, 270);
    pdf.text(`Teodoro Antonio Alvarez Obando`, 30, 276);
    pdf.text(`Denuncia:`, 113, 270);
    pdf.line(186, 270, 131, 270);
    pdf.text(`Teodoro Antonio Alvarez Obando`, 130, 276);

    return pdf.output();
  }

  async getOne(id: string, repository: any): Promise<any> {
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
      default:
        // Handle any other database error
        const errorMessage =
          error.detail || error.message || 'Unrecognized database Error';
        throw new Error(errorMessage);
    }
  }

  handleDateDaysToString(dateDay: number): string {
    switch (dateDay) {
      case 0:
        return 'Domingo';
      case 1:
        return 'Lunes';
      case 2:
        return 'Martes';
      case 3:
        return 'Miercoles';
      case 4:
        return 'Jueves';
      case 5:
        return 'Viernes';
      case 6:
        return 'Sabado';
      default:
        return 'Undefined';
    }
  }
}
