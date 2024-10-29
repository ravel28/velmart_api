import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateUserContactDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: 'Email to regritasi',
        minLength: 0,
        maxLength: 250,
        type: String,
        required: true
    })
    email: string;

    @IsNotEmpty()
    @IsEnum(RoleEnum)
    @ApiProperty({
        description: 'Role to access data',
        minLength: 0,
        maxLength: 250,
        enum: RoleEnum,
        required: true
    })
    role: RoleEnum;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    @ApiProperty({
        description: 'Password to authentication',
        minLength: 0,
        maxLength: 250,
        type: String,
        required: true
    })
    password: string;
}