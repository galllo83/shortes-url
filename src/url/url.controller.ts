import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UrlService } from './url.service';
import { DecodeUrlDto } from './dto/decode-url.dto';
import { EncodeUrlDto } from './dto/encode-url.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Url')
@Controller('url')
export class UrlController {
  constructor(private urlService: UrlService) {}
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('local'))
  @Post('encode')
  async encode(
    @Body() encodeUrlDto: EncodeUrlDto,
  ): Promise<string> {
    return await this.urlService.encodeUrl(encodeUrlDto);
  }
  
  @ApiBearerAuth()
  @UseGuards(AuthGuard('local'))
  @Post('decode')
  async decode(
    @Body() decodeUrlDto: DecodeUrlDto,
  ): Promise<string> {
    return await this.urlService.decodeUrl(decodeUrlDto);
  }
}
