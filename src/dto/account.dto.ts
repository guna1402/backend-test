import { 
    IsEmail, 
    IsNotEmpty,
    IsString,
} from "class-validator";

export class AccountDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string;
}