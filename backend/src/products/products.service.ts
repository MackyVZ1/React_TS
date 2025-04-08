import { Injectable } from "@nestjs/common";
import { Prisma , Products} from "@prisma/client";
import { DatabaseService } from "src/database/database.service";
import { MyLoggerService } from "src/my-logger/my-logger.service";

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  private readonly logger = new MyLoggerService(ProductsService.name);

  async create(createProductDto: Prisma.ProductsCreateInput): Promise<Products> {
    return this.databaseService.products.create({
      data: createProductDto
    });
  }

  async findAll(category?: string) {
    if(category) return this.databaseService.products.findMany({
      where:{
        category,
      }
    })
    return this.databaseService.products.findMany()
  }

  async findOne(productID: number) {
    if(productID) return this.databaseService.products.findUnique({
      where:{
        productID,
      }
    });
  }

  async update(productID: number, updateProductDto: Prisma.ProductsUpdateInput) {
    return this.databaseService.products.update({
      where:{
        productID,
      },
      data: updateProductDto
    });
  }

  async remove(productID: number) {
    return this.databaseService.products.delete({
      where:{
        productID,
      }
    });
  }
}
