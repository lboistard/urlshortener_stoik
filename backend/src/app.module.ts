import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { envValidationSchema } from "./config/configuration";
import { PrismaModule } from "./prisma/prisma.module";
import { LinksModule } from "./links/links.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      validationSchema: envValidationSchema,
    }),
    PrismaModule,
    LinksModule,
  ],
})
export class AppModule {}
