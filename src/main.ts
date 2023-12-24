import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";
import * as process from "process";
import { setupSwagger } from "./app/docs/swagger.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  await app.listen(process.env.PORT);
}
bootstrap().then(() =>
  console.log(`Server is running on http://localhost:${process.env.PORT}`),
);
