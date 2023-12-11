import { IsInt, IsOptional, Min } from 'class-validator';

export class PaginationDTO {
  @Min(1)
  @IsInt()
  @IsOptional()
  pageSize?: number = 1;

  @Min(1)
  @IsInt()
  @IsOptional()
  pageNumber?: number = 10;

  @IsOptional()
  cursor?: string;
}
