import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./all-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.setGlobalPrefix("api"); // http://localhost:3000/api
  app.enableCors(); // เปิดใช้งาน cor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
