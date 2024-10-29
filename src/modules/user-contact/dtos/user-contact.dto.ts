import { RoleEnum } from "@prisma/client";

export class UserContactDto {
  idUserContact: number;
  uniqueId: string;
  email: string;
  role: RoleEnum;
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  cartUserIdCart?: number;
//   cart Cart[]
}