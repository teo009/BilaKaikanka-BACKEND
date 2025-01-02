import { ValidRoles } from 'src/common/enums';

interface directionInterface {
  email: string;
  password: string;
  fullName: string;
  isActive: boolean;
  role: ValidRoles;
}

export const directionSeed: directionInterface = {
  email: 'direccion.dpig@uraccan.edu.ni', //change this later for the real mail
  password: 'BilaKaikanka2025',
  fullName: 'Director Apellidos',
  isActive: true,
  role: ValidRoles.director,
};
