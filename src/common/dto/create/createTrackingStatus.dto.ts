import { IsString, Matches } from "class-validator";

export class CreateTrackingStatusTypeDto {
  @IsString()
  @Matches(/^(pending|in|done|unsolved|remited)$/, {
    message: '(Error) Seguimiento debe de contener (pending|in|done|unsolved|remited)',
  })
  name: string;
}