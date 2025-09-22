import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'Código do produto',
    example: 101,
  })
  @IsNotEmpty()
  code: number;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Teclado Mecânico Gamer',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
