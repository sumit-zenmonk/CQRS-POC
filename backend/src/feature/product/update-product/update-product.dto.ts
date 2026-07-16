import { IsString, IsNotEmpty, IsNumber, MaxLength, IsPositive, IsOptional } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @MaxLength(150)
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    price: number;

    @IsString()
    @IsOptional()
    image_url: string;
}