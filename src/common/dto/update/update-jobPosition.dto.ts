import { PartialType } from "@nestjs/mapped-types";
import { CreateJobPositionDto } from "../create/create-jobPosition.dto";


export class UpdateJobPositionDto extends PartialType(
  CreateJobPositionDto
) {}