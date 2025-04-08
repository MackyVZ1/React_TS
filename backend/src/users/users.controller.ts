import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  Ip,
  NotFoundException,
  HttpStatus,
  HttpException,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { Prisma } from "@prisma/client";
import { Throttle, SkipThrottle } from "@nestjs/throttler";
import { MyLoggerService } from "src/my-logger/my-logger.service";

@SkipThrottle()
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  private readonly logger = new MyLoggerService(UsersController.name);

  //เพิ่มข้อมูลผู้ใช้ : http://localhost:3000/api/users
  // {
  //   "username": "your input",
  //   "password": "your input",
  //   "phoneNum": "your input",
  //   "isOnline": false | true, // default เป็น false
  //   "roleID": your roleID
  // }
  @Post()
  async create(@Ip() ip: string, @Body() createUserDto: Prisma.UsersCreateInput) {
    this.logger.log(`Request POST Users\t ${ip}`)
    try {
      return await this.usersService.create(createUserDto);
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'ไม่สามารถสร้างผู้ใช้ได้',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // เรียกดูผู้ใช้ : http://localhost:3000/api/users
  @SkipThrottle({ default: false })
  @Get()
  async findAll(@Ip() ip: string, @Query("roleID", ParseIntPipe) roleID?: 0 | 2) {
    this.logger.log(`Request GET Users\t ${ip}`);
    try {
      const users = await this.usersService.findAll(roleID);
      if (users.length === 0) {
        return { status: HttpStatus.OK, data: [], message: "ไม่พบข้อมูลผู้ใช้" };
      }
      return { status: HttpStatus.OK, data: users, message: "ดึงข้อมูลสำเร็จ" };
    } catch (error) {
      this.logger.error(`Failed to get users: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // เรียกดูผู้ใช้ด้วย userID : http://localhost:3000/api/users/:userID
  @Throttle({})
  @Get(":userID")
  async findOne(@Ip() ip: string, @Param("userID", ParseIntPipe) userID: number) {
    this.logger.log(`Request GET Users By userID:${userID}\t${ip}`);
    try {
      const user = await this.usersService.findOne(userID);
      if (!user) {
        throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID: ${userID}`);
      }
      return { status: HttpStatus.OK, data: user, message: "ดึงข้อมูลสำเร็จ" };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to get user ${userID}: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'เกิดข้อผิดพลาดในการดึงข้อมูล',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // อัพเดทข้อมูลผู้ใช้ : http://localhost:3000/api/users
  @Throttle({})
  @Patch(":userID")
  async update(
    @Ip() ip: string,
    @Param("userID", ParseIntPipe) userID: number,
    @Body() updateUserDto: Prisma.UsersUpdateInput,
  ) {
    this.logger.log(`Request UPDATE userID:${userID}\t${ip}`);
    try {
      // ตรวจสอบก่อนว่าผู้ใช้มีอยู่จริงหรือไม่
      const existingUser = await this.usersService.findOne(userID);
      if (!existingUser) {
        throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID: ${userID}`);
      }
      
      const updatedUser = await this.usersService.update(userID, updateUserDto);
      return { status: HttpStatus.OK, data: updatedUser, message: "อัปเดตข้อมูลสำเร็จ" };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to update user ${userID}: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ลบข้อมูลผู้ใช้ : http://localhost:3000/api/users/:userID
  @Throttle({})
  @Delete(":userID")
  async remove(@Ip() ip: string, @Param("userID", ParseIntPipe) userID: number) {
    this.logger.log(`Request DELETE userID:${userID}\t${ip}`);
    try {
      // ตรวจสอบก่อนว่าผู้ใช้มีอยู่จริงหรือไม่
      const existingUser = await this.usersService.findOne(userID);
      if (!existingUser) {
        throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID: ${userID}`);
      }
      
      const result = await this.usersService.remove(userID);
      return { status: HttpStatus.OK, data: result, message: "ลบข้อมูลสำเร็จ" };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to delete user ${userID}: ${error.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'เกิดข้อผิดพลาดในการลบข้อมูล',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}