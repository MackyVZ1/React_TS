import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Ip,
  HttpException,
  HttpStatus,
  Query,
  NotFoundException,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { Prisma } from "@prisma/client";
import { Throttle, SkipThrottle } from "@nestjs/throttler";
import { MyLoggerService } from "src/my-logger/my-logger.service";

@SkipThrottle()
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  private readonly logger = new MyLoggerService(ProductsController.name);

  // เพิ่มสินค้า : http://localhost:3000/api/products
//   {
//     "productName":"your input", : string
//     "description":"your input", : string
//     "category":"your input", : string
//     "price": your input, : number
//     "amount":your input : number 
//  }
  @Post()
  async create(
    @Ip() ip: string,
    @Body() createProductDto: Prisma.ProductsCreateInput,
  ) {
    this.logger.log(`Request POST Products\t${ip}`);
    try {
      return this.productsService.create(createProductDto);
    } catch (e) {
      this.logger.error(`Failed to create product: ${e.message}`);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "ไม่สาม่ารถเพิ่มสินค้าได้",
          message: e.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  // เรียกดูสินค้า : http://localhost:3000/api/products
  @SkipThrottle({ default: false })
  @Get()
  async findAll(@Ip() ip: string, @Query("category") category?: string) {
    this.logger.log(`Request GET Product\t${ip}`);
    try {
      const products = await this.productsService.findAll(category);
      const product = products.map(product => product.category == category)
      if (product.length === 0) return new NotFoundException(`ไม่พบข้อมูลสินค้า`)
      return {
        status: HttpStatus.OK,
        data: products,
        message: "เรียกดูสินค้าสำเร็จ",
      };
    } catch (e) {
      this.logger.error(`Failed to get products: ${e.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ค้นหาสินค้าด้วย ID : http://localhost:3000/api/products
  @Throttle({})
  @Get(":productID")
  async findOne(
    @Ip() ip: string,
    @Param("productID", ParseIntPipe) productID: number,
  ) {
    this.logger.log(`Request GET Products By prductID: ${productID}\t${ip}`);
    try {
      const product = await this.productsService.findOne(productID);
      if (!product) {
        throw new NotFoundException(`ไม่พบสินค้าที่มี ID: ${productID}`);
      }
      return {
        status: HttpStatus.OK,
        data: product,
        message: "ดึงข้อมูลสำเร็จ",
      };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      this.logger.error(`Failed to get user ${productID}: ${e.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: "เกิดข้อผิดพลาดในการดึงข้อมูล",
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // อัปเดตสินค้า : http://localhost:3000/api/products
  @Throttle({})
  @Patch(":productID")
  async update(
    @Ip() ip: string,
    @Param("productID", ParseIntPipe) productID: number,
    @Body() updateProductDto: Prisma.ProductsUpdateInput,
  ) {
    this.logger.log(`Request UPDATE productID:${productID}\t${ip}`);
    try{
      const existingProduct = await this.productsService.findOne(productID)
      if(!existingProduct) throw new NotFoundException(`ไม่พบสินค้าที่ม่ี ID: ${productID}`)
        const updateProduct = await this.productsService.update(productID, updateProductDto)
      return {status: HttpStatus.OK, data: updateProduct, message: "อัปเดตสินค้าสำเร็จ"}
    }catch(e){
      if(e instanceof NotFoundException) throw e;
      this.logger.error(`Faiiled to update product ${productID}: ${e.message}`)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล',
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ลบสินค้าด้วย ID : http://localhost:3000/api/products/:productID
  @Throttle({})
  @Delete(":productID")
  async remove(
    @Ip() ip: string,
    @Param("productID", ParseIntPipe) productID: number,
  ) {
    this.logger.log(`Request DELETE productID:${productID}\t${ip}`);
    try {
      // ตรวจสอบก่อนว่าผู้ใช้มีอยู่จริงหรือไม่
      const existingProduct = await this.productsService.findOne(productID);
      if (!existingProduct) {
        throw new NotFoundException(`ไม่พบผู้ใช้ที่มี ID: ${productID}`);
      }
      
      const result = await this.productsService.remove(productID);
      return { status: HttpStatus.OK, data: result, message: "ลบข้อมูลสำเร็จ" };
    } catch (e) {
      if (e instanceof NotFoundException) {
        throw e;
      }
      this.logger.error(`Failed to delete user ${productID}: ${e.message}`);
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'เกิดข้อผิดพลาดในการลบข้อมูล',
          message: e.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
