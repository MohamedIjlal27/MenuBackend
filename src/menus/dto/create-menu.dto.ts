import { IsString, IsOptional } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  parentId?: string;
}