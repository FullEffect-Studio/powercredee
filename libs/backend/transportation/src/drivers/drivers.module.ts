import { Injectable, Module } from "@nestjs/common";
import {DriversController} from "./drivers.controller";
import {DriversRepository} from "./drivers.repository";

@Module({
  imports: [],
  controllers: [DriversController],
  providers: [DriversRepository]
})
export class DriversModule{

}
