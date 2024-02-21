import { PartialType } from "@nestjs/mapped-types";

import { CreateVictimRelationship } from "../create/create-victimRelationship";


export class UpdateVictimRelationshipDto extends PartialType(
  CreateVictimRelationship
) {}