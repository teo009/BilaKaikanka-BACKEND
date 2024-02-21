import { PartialType } from "@nestjs/mapped-types";
import { CreateRoleInCaseDto } from "../create/create-roleInCase.dto";


export class UpdateRoleInCaseDto extends PartialType(
  CreateRoleInCaseDto
) {}