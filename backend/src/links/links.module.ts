import { Module } from "@nestjs/common";
import { LINK_REPOSITORY } from "./ports/link-repository.port";
import { PrismaLinkRepository } from "./adapters/prisma-link.repository";
import { CreateLinkUseCase } from "./use-cases/create-link";
import { LinkController } from "./presentation/link.controller";

@Module({
  controllers: [LinkController],
  providers: [
    CreateLinkUseCase,
    {
      provide: LINK_REPOSITORY,
      useClass: PrismaLinkRepository,
    },
  ],
})
export class LinksModule {}
