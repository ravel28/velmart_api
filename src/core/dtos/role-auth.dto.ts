import { RoleEnum } from "@prisma/client";

export class RoleAuthDto {
    email: string;
    role: RoleEnum;
    time: Date;
}