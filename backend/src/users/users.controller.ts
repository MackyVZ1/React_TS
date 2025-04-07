import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Prisma } from "@prisma/client";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UsersCreateInput) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll(@Query("roleID") roleID?: 0 | 2) {
    return this.usersService.findAll(roleID);
  }

  @Get(":userID")
  findOne(@Param("userID") userID: number) {
    return this.usersService.findOne(userID);
  }

  @Patch(":userID")
  update(
    @Param("userID") userID: number,
    @Body() updateUserDto: Prisma.UsersUpdateInput,
  ) {
    return this.usersService.update(userID, updateUserDto);
  }

  @Delete(":userID")
  remove(@Param("userID") userID: number) {
    return this.usersService.remove(userID);
  }
}
