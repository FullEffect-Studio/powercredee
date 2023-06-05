import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackendCoreModule } from '@bb/backend/core';
import { BackendTransportationModule } from '@bb/backend/transportation';
import {SwaggerModule} from "@nestjs/swagger";

@Module({
  imports: [
    BackendTransportationModule,
    SwaggerModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
