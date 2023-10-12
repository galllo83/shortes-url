import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './schemas/url.schema';
import { EncodeUrlDto } from './dto/encode-url.dto';
import { DecodeUrlDto } from './dto/decode-url.dto';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel('url') private readonly urlModel: Model<UrlDocument>,
  ) {}

  async encodeUrl(url: EncodeUrlDto): Promise<string> {
    const base64Url = Buffer.from(url.url).toString('base64');

    const shortUrl = base64Url.substring(0, 6);

    return shortUrl;
  }

  async decodeUrl(url: DecodeUrlDto): Promise<string> {
    const paddedShortUrl = url.url.padEnd(
      Math.ceil(url.url.length / 4) * 4,
      '=',
    );

    const longUrl = Buffer.from(paddedShortUrl, 'base64').toString();

    return longUrl;
  }
}
