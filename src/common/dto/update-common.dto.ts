import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleInCaseDto } from './create-roleInCase.dto';

export class UpdateCommonDto extends PartialType(CreateRoleInCaseDto) {}
