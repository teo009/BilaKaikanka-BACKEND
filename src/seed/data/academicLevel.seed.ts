interface academicLevelInterface {
  name: string;
}

interface academicLevelData {
  academicLevel: academicLevelInterface[];
}

export const academicLevelSeed: academicLevelData = {
  academicLevel: [
    { name: 'Ninguno' },
    { name: 'Educación primaria' },
    { name: 'Educación secundaria' },
    { name: 'Técnico medio' },
    { name: 'Técnico superior' },
    { name: 'Licenciatura' },
    { name: 'Ingeniería' },
    { name: 'Maestría' },
    { name: 'Doctorado' },
  ],
};
