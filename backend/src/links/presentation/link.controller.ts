import { Body, Controller, Post } from "@nestjs/common";
import { CreateLinkUseCase } from "../use-cases/create-link";
import { ApiBody } from "@nestjs/swagger";
import { CreateLinkDto } from "./dto/create-link.dto";

@Controller("links")
export class LinkController {
  constructor(private readonly createLink: CreateLinkUseCase) {}

  @Post()
  @ApiBody({ type: CreateLinkDto })
  async create(@Body() dto: CreateLinkDto) {
    return this.createLink.execute({ targetUrl: dto.url });
  }
}
