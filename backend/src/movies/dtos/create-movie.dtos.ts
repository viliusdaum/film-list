import { IsString, isString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  name: string;

  @IsString()
  year: string;
}
