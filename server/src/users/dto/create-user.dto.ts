import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAndUpdateDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}
