import { SetMetadata } from "@nestjs/common";
import { ValidRoles } from "../../common/enums/valid-roles.interface";


export const META_ROLES = 'roles';

export const RoleProtected = (...arg: ValidRoles[]) => {
  return SetMetadata(META_ROLES, arg);
}