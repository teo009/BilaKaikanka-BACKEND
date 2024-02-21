import { PartialType } from "@nestjs/mapped-types";
import { CreateAcademicLevel } from "../create/create-AcademicLevel.dto";


export class UpdateAcademicLevelDto extends PartialType(
  CreateAcademicLevel
) {}