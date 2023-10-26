import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UrlService } from './url.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Url } from './schemas/url.schema';
import { EncodeUrlDto } from './dto/encode-url.dto copy';
import { DecodeUrlDto } from './dto/decode-url.dto';

@ApiTags('Url')
@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('encode')
  async encode(
    @Body() body: EncodeUrlDto,
  ): Promise<DecodeUrlDto> {
    return await this.urlService.encodeUrl(body.url);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Post('decode')
  async decode(
    @Body() body: DecodeUrlDto,
  ): Promise<EncodeUrlDto> {
    return await this.urlService.decodeUrl(body.shortUrl);
  }
}
