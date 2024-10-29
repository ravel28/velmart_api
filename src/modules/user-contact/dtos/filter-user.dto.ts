import { RoleEnum } from "@prisma/client";

export class FilterRoleEnumDto {
    in: RoleEnum[];
}