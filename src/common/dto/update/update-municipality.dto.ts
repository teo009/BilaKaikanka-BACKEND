import { PartialType } from "@nestjs/mapped-types";
import { CreateMunicipalityDto } from '../create/create-municipality.dto';


export class UpdateMunicipalityDto extends PartialType(
  CreateMunicipalityDto
) {};