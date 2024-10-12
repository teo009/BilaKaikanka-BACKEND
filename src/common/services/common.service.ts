import * as fs from 'fs';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import jsPDF from 'jspdf';

@Injectable()
export class CommonService {
  constructor() {}

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

  //PDF GENERATION
  generatePdf(caseData) {
    const pdf = new jsPDF();
    const xOffSet = pdf.internal.pageSize.width / 2;
    const occurrenceDate = new Date(caseData.occurrence_date);
    const receptionDate = new Date(caseData.reception_date);

    const pathFile = 'public/logo.png';
    const logo = fs.readFileSync(pathFile, {
      encoding: 'base64',
    });

    pdf.setLineWidth(0.1);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.addImage(logo, 'PNG', 20, 14, 20, 20);
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
    caseData.person.complainant.map((person) => {
      //console.log(person);
      if (person.role_in_case === 'Denunciante') {
        pdf.text(
          `Nombres y apellidos: ${person.firstName} ${person.secondName}`,
          12,
          79,
        );
        pdf.text(`Numero de telefono/s: ${person.phoneNumbers}`, 116, 79);
        pdf.text(`Edad: (20) anios`, 174, 79);
        pdf.text(`Cedula: ${person.identity}`, 12, 85);
        pdf.text(`Etnia: (Mestiza)`, 70, 85);
        pdf.text(`Sexo: ${person.gender}`, 110, 85);
        //pdf.text(`Preferencia sexual: (Femenino)`, 151, 85);
        pdf.text(
          `Procedencia / direccion: ${person.homeAddress}`,
          xOffSet,
          91,
          { align: `center` },
        );
      }
    });

    pdf.rect(10, 96, pdf.internal.pageSize.width - 20, 50);
    let y: number = 103;
    if (!(y + 48 < pdf.internal.pageSize.height)) {
      pdf.addPage();
      y = 20;
    }
    pdf.text('VICTIMA', xOffSet, 101, { align: `center` });
    caseData.person.victim.map((person) => {
      y = y + 4;
      pdf.text(
        `Nombres y apellidos: ${person.firstName} ${person.secondName}`,
        12,
        y,
      );
      pdf.text(`Numero de telefono/s: ${person.phoneNumbers}`, 116, y);
      pdf.text(`Edad: (20) anios`, 174, y);
      pdf.text(`Cedula: ${person.identity}`, 12, y + 6);
      pdf.text(`Etnia: (Mestiza)`, 70, y + 6);
      pdf.text(`Sexo: ${person.gender}`, 110, y + 6);
      //pdf.text(`Preferencia sexual: (Femenino)`, 151, y + 6);
      pdf.text(`Estado civil: (Union libre)`, 12, y + 12);
      pdf.text(
        `Nivel academico: ${person.academicLevel.academicLevel}`,
        60,
        y + 12,
      );
      pdf.text(`Carrera y anio: (Ingenieria en Sistemas, II)`, 118, y + 12);
      pdf.text(
        `Centro de trabajo y cargo: ${person.workplace}, (contador)`,
        12,
        y + 18,
      );
      pdf.text(
        `Tipo de violencia: ${person.violenceType.violenceType}`,
        128,
        y + 18,
      );
      pdf.text(`Lugar ocurrencia: ${caseData.place_of_events}`, 12, y + 24);
      pdf.text(`Tiempo ocurrencia: ${caseData.occurrence_time}`, 12, y + 30);
      pdf.text(
        `Parentezco y/o relacion con el agresor: ${person.victimRelationship}`,
        90,
        y + 30,
      );
      pdf.text(
        `Procedencia / direccion: ${person.homeAddress}`,
        xOffSet,
        y + 36,
        {
          align: `center`,
        },
      );
      pdf.line(12, y + 39, 198, y + 39);
      y = y + 40;
    });

    pdf.rect(10, 148, pdf.internal.pageSize.width - 20, 50); 195
    if (caseData.person.aggressor.length > 0) {
      caseData.person.aggressor && caseData.person.aggressor.map((person) => {
        if (!(y + 48 < pdf.internal.pageSize.height)) {
          pdf.addPage();
          y = 20;
        }
        y = y + 4;
        pdf.text('PRESUNTO VICTIMARIO', xOffSet, y, { align: `center` });
        pdf.text(
          `Nombres y apellidos: ${person.firstName} ${person.secondName}`,
          12,
          y + 6,
        );
        pdf.text(`Numero de telefono/s: ${person.phoneNumbers}`, 116, y + 6);
        pdf.text(`Edad: (20) anios`, 174, y + 6);
        pdf.text(`Cedula: ${person.identity}`, 12, y + 12);
        pdf.text(`Etnia: (Mestiza)`, 70, y + 12);
        pdf.text(`Sexo: ${person.gender}`, 110, y + 12);
        //pdf.text(`Preferencia sexual: (Femenino)`, 151, y + 12);
        pdf.text(`Estado civil: (Union libre)`, 12, y + 18);
        pdf.text(
          `Nivel academico: ${person.academicLevel.academicLevel}`,
          60,
          y + 18,
        );
        pdf.text(`Carrera y anio: (Ingenieria en Sistemas, II)`, 118, y + 18);
        pdf.text(
          `Centro de trabajo y cargo: ${person.workplace}, contadora`,
          12,
          y + 24,
        );
        pdf.text(
          `Tipo de violencia: ${person.violenceType.violenceType}`,
          128,
          y + 24,
        );
        pdf.text(`Lugar ocurrencia: ${caseData.place_of_events}`, 12, y + 30);
        pdf.text(`Tiempo ocurrencia: ${caseData.occurrence_time}`, 12, y + 36);
        pdf.text(
          `Parentezco y/o relacion con el victimario: ${person.victimRelationship}`,
          90,
          y + 36,
        );
        pdf.text(
          `Procedencia / direccion: ${person.homeAddress}`,
          xOffSet,
          y + 42,
          {
            align: `center`,
          },
        );
        pdf.line(12, y + 46, 198, y + 44);
        y = y + 48;
      });
    }

    if (!(y + 48 < pdf.internal.pageSize.height)) {
      pdf.addPage();
      y = 20;
    }
    pdf.text(`NARRACION DE LOS HECHOS: ${caseData.narration}`, 10, y + 4, {
      align: 'justify',
      maxWidth: pdf.internal.pageSize.width - 22,
    });
    pdf.text(`Recepcion:`, 10, y + 40);
    pdf.line(30, y + 40, 86, y + 40);
    pdf.text(`Teodoro Antonio Alvarez Obando`, 30, y + 44); //Agregar al usuario real acá
    pdf.text(`Denuncia:`, 113, y + 40);
    pdf.line(186, y + 40, 131, y + 40);

    if (caseData.person.complainant[0].firstName === undefined) {
      pdf.text(
        `Denunciante indefinido`,
        132,
        y + 44,
      );
    } else {
      pdf.text(
        `${caseData.person.complainant[0].firstName} ${caseData.person.complainant[0].secondName}`,
        132,
        y + 44,
      );
    }

    const pdfContent = pdf.output('datauristring');
    const buffer = Buffer.from(pdfContent.split('base64,')[1], 'base64');
    return buffer;
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

  addNewPdfPage(pdf: jsPDF, isNewPageNeeded: boolean) {
    if (isNewPageNeeded) {
      pdf.addPage();
    }
  }
}
