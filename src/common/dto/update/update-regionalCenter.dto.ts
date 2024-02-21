import { PartialType } from "@nestjs/mapped-types";
import { CreateRegionalCenter } from "../create/create-regionalCenter.dto";


export class UpdateRegionalCenterDto extends PartialType(
  CreateRegionalCenter
) {}