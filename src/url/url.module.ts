import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from "@nestjs/mongoose"
import { UrlSchema } from "./schemas/url.schema";
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: "url", schema: UrlSchema }])],
  providers: [UrlService],
  controllers: [UrlController]
})
export class UrlModule {}