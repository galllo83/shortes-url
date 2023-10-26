import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';
import { UrlDto } from './dto/url.dto';
import { DecodeUrlDto } from './dto/decode-url.dto';
import { EncodeUrlDto } from './dto/encode-url.dto copy';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async encodeUrl(url: string): Promise<DecodeUrlDto> {
    const existUrl = await this.findUrl(url);

    if (existUrl) return { shortUrl: existUrl.shortUrl };

    const shortUrl = await this.createShortUrl();

    const createUrl: Url = {
      url: url,
      shortUrl: shortUrl,
    };

    const newUrl = await this.createUrl(createUrl);

    return { shortUrl: newUrl.shortUrl };
  }

  async decodeUrl(shortUrl: string): Promise<EncodeUrlDto> {
    const decodeUrl = await this.urlModel.findOne({ shortUrl: shortUrl });

    if (!decodeUrl) throw new NotFoundException('Short Url not found');

    return { url: decodeUrl.url };
  }

  async createUrl(createUrl: Url): Promise<Url> {
    return await this.urlModel.create(createUrl);
  }

  async createShortUrl(): Promise<string> {
    const shortUrl = (Math.random() + 1).toString(36).substring(6);

    const existShortUrl = await this.findShortUrl(shortUrl);

    if (!existShortUrl) return shortUrl;
    else await this.createShortUrl();
  }

  async findUrl(url: string): Promise<UrlDto> {
    const existUrl = await this.urlModel.findOne({ url: url });

    return existUrl;
  }

  async findShortUrl(shortUrl: string): Promise<Url> {
    return await this.urlModel.findOne({ shortUrl: shortUrl });
  }
}
