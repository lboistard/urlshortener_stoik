import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsUrl } from "class-validator";

export class CreateLinkDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    description: "The URL to shorten",
    example: "https://www.google.com",
    format: "url",
    type: String,
    required: true,
  })
  url: string;
}
