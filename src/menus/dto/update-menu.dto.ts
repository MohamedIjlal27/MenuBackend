import { IsString, IsOptional } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}