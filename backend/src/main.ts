import "dotenv/config";

import { NestFactory } from "@nestjs/core";
import { ExpressAdapter } from "@nestjs/platform-express";
import { writeFileSync } from "fs";
import { join } from "path";
import session from "express-session";
import passport from "passport";

import { ValidationPipe } from "@nestjs/common";

import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter());
  const frontendUrl = process.env.FRONTEND_URL;

  app.enableCors({
    origin: frontendUrl,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  const sessionSecret =
    process.env.SESSION_SECRET ?? "dev-secret-change-in-production";
  app.use(
    session({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,
        sameSite: "lax",
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle("Url Shortener - Stoik")
    .setDescription("API to shorten urls.")
    .setVersion("0.1")
    .addBearerAuth(
      { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      "access-token",
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // This is a way for me to type my frontend with the json api spec
  if (process.env.GENERATE_OPENAPI === "1") {
    const outputPath = join(process.cwd(), "openapi.json");
    writeFileSync(outputPath, JSON.stringify(document, null, 2));
    process.exit(0);
  }

  SwaggerModule.setup("docs", app, () => document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  app.enableShutdownHooks();
}
bootstrap();
