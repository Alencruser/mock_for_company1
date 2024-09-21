import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateChildCareDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 100)
    name: string;
}
