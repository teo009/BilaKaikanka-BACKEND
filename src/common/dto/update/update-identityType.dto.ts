import { PartialType } from "@nestjs/mapped-types";
import { CreateIdentityType } from "../create/create-identityType.dto";


export class UpdateIdentityType extends PartialType(
  CreateIdentityType
) {}