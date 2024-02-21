import { PartialType } from "@nestjs/mapped-types";
import { CreateViolencetypeDto } from "../create-violencetype.dto";


export class UpdateCaseViolencetypeDto extends PartialType(
  CreateViolencetypeDto
) {}