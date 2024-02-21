import { PartialType } from "@nestjs/mapped-types";
import { CreateViolenceTypeDto } from "../create/create-violenceType.dto";


export class UpdateViolenceTypeDto extends PartialType(
  CreateViolenceTypeDto
) {};