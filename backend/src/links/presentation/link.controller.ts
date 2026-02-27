import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Res,
  Req,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { CreateLinkUseCase } from "../use-cases/create-link";
import { GetBySlugUseCase } from "../use-cases/get-by-slug";
import { ApiBody, ApiParam, ApiResponse } from "@nestjs/swagger";
import { CreateLinkDto } from "./dto/create-link.dto";
import { LinkResponseDto } from "./dto/link-response.dto";
import { GetSlugsUseCase } from "../use-cases/get-slugs";
import { User } from "generated/prisma/client";
import { SessionGuard } from "src/auth/presentation/session.guard";

@Controller()
export class LinkController {
  constructor(
    private readonly createLink: CreateLinkUseCase,
    private readonly getBySlub: GetBySlugUseCase,
    private readonly getSlugs: GetSlugsUseCase,
  ) {}

  @Get("/links")
  @UseGuards(SessionGuard)
  @ApiResponse({ status: HttpStatus.OK, type: [LinkResponseDto] })
  async getSlugsBySession(@Req() req: Request & { user: User }) {
    return this.getSlugs.execute(req.user);
  }

  @Post("/links")
  @ApiBody({ type: CreateLinkDto })
  @ApiResponse({ status: HttpStatus.CREATED, type: LinkResponseDto })
  async create(
    @Body() dto: CreateLinkDto,
    @Req() req: Request & { user?: User },
  ) {
    return this.createLink.execute({
      targetUrl: dto.url,
      userId: req.user?.id,
    });
  }

  @Get(":slug")
  @ApiParam({ name: "slug", type: String })
  @ApiResponse({
    status: HttpStatus.FOUND,
    description: "Redirects to the target URL (browser)",
    headers: {
      Location: { description: "Target URL", schema: { type: "string" } },
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description:
      "Returns target URL as JSON (only for the swagger/openapi page)",
    schema: {
      type: "object",
      properties: { targetUrl: { type: "string" } },
    },
  })
  async redirectBySlug(
    @Param("slug") slug: string,
    @Headers("accept") accept: string | undefined,
    @Res({ passthrough: false }) res: Response,
  ) {
    const link = await this.getBySlub.execute(slug);

    // The wantsJson part is here so we can test the API in the /docs page.
    // Because this page is not a browser we need to return the wanted value but we can't
    // redirect to another page (or I don't know how to do it)
    const wantsJson =
      accept != null && accept.toLowerCase().includes("application/json");
    if (wantsJson) {
      res.setHeader("Location", link.targetUrl);

      return res.status(HttpStatus.OK).json({ targetUrl: link.targetUrl });
    }

    res.redirect(HttpStatus.FOUND, link.targetUrl);
  }
}
