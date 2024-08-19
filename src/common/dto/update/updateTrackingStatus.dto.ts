import { PartialType } from "@nestjs/mapped-types";
import { CreateTrackingStatusTypeDto } from "../create";


export class UpdateTrackingStatusTypeDto extends PartialType(
  CreateTrackingStatusTypeDto
) {};