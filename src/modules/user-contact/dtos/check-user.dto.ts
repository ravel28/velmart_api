import { RoleEnum } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CheckUsernameDto{
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class CheckUserContactDto{
    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsEnum(RoleEnum)
    role: RoleEnum;
}