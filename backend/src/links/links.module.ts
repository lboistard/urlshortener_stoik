import { Module } from "@nestjs/common";
import { LINK_REPOSITORY } from "./ports/link-repository.port";
import { PrismaLinkRepository } from "./adapters/prisma-link.repository";
import { CreateLinkUseCase } from "./use-cases/create-link";
import { GetBySlugUseCase } from "./use-cases/get-by-slug";
import { LinkController } from "./presentation/link.controller";
import { GetSlugsUseCase } from "./use-cases/get-slugs";

@Module({
  controllers: [LinkController],
  providers: [
    CreateLinkUseCase,
    GetBySlugUseCase,
    GetSlugsUseCase,
    {
      provide: LINK_REPOSITORY,
      useClass: PrismaLinkRepository,
    },
  ],
})
export class LinksModule {}
