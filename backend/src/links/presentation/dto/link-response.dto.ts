import { ApiProperty } from "@nestjs/swagger";

export class LinkResponseDto {
  @ApiProperty({ example: "clxx1234567890" })
  id: string;

  @ApiProperty({ example: "abc12XYZ" })
  slug: string;

  @ApiProperty({ example: "https://www.google.com" })
  targetUrl: string;
}
