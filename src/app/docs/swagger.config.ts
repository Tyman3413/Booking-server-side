import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle("Booking API")
    .setDescription(
      "API for managing online bookings. Allows users to create, modify, and cancel bookings.",
    )
    .setVersion("v-1.0.0-beta")
    .setTermsOfService("https://example.com")
    .addTag("Authentication", "Authentication user in system")
    .setContact("Victor", "https://t.me/Tyman3413", "tyman3413@gmail.com")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
}
