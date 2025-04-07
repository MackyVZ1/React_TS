import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: Prisma.UsersCreateInput) {
    return this.databaseService.users.create({
      data: createUserDto,
    });
  }

  async findAll(roleID?: 0 | 2) {
    if (roleID)
      return this.databaseService.users.findMany({
        where: {
          roleID,
        },
      });
    return this.databaseService.users.findMany();
  }

  async findOne(userID: number) {
    return this.databaseService.users.findUnique({
      where: {
        userID,
      },
    });
  }

  async update(userID: number, updateUserDto: Prisma.UsersUpdateInput) {
    return this.databaseService.users.update({
      where: {
        userID,
      },
      data: updateUserDto,
    });
  }

  async remove(userID: number) {
    return this.databaseService.users.delete({
      where: {
        userID,
      },
    });
  }
}
