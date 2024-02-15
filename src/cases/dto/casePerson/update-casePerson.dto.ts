import { PartialType } from "@nestjs/mapped-types";
import { CreateCasePersonDto } from "./create-casePerson.dto";

export class UpdateCasePersonDto extends PartialType(
  CreateCasePersonDto
) {}