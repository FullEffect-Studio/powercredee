import { Injectable } from '@nestjs/common'
import {Driver, Prisma,} from '@prisma/client'
import {PrismaService} from "@bb/backend/core";

@Injectable()
export class DriversRepository{
   constructor(private prisma: PrismaService) {
   }

   async driver(driverWhereUniqueInput: Prisma.DriverWhereUniqueInput): Promise<Driver|null> {
     return this.prisma.driver.findUnique({
       where: driverWhereUniqueInput
     })
   }

   async drivers(params: {
     skip?: number
     take?: number
     cursor?: Prisma.DriverWhereUniqueInput,
     where?: Prisma.DriverWhereInput,
     orderBy?: Prisma.DriverOrderByWithRelationInput
   }): Promise<Driver[]>{
     const {skip, take, cursor, where, orderBy} = params
     return this.prisma.driver.findMany({
       skip,
       take,
       cursor,
       where,
       orderBy
     })
   }

  async createDriver(data: Prisma.DriverCreateInput): Promise<Driver> {
    return this.prisma.driver.create({data});
  }

  async updateDriver(params: {
    where: Prisma.DriverWhereUniqueInput;
    data: Prisma.DriverUpdateInput;
  }): Promise<Driver> {
    const { where, data } = params;
    return this.prisma.driver.update({
      data,
      where,
    });
  }

  async deleteDriver(where: Prisma.DriverWhereUniqueInput): Promise<Driver> {
    return this.prisma.driver.delete({
      where,
    });
  }

}
