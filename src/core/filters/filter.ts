import { RoleEnum } from "@prisma/client";

export const roleEnumFilterToUser = (
    value: string,
  ): RoleEnum[] => {
    const lowerCaseValue = value.toLowerCase();
    const keyword = lowerCaseValue.replace(/\s+/g, '_');
    return Object.values(RoleEnum).filter((RoleEnum) =>
      RoleEnum.toString().toLowerCase().includes(keyword),
    );
  };