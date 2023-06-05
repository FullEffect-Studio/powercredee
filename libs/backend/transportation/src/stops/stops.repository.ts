import {Injectable} from '@nestjs/common'
import {Prisma, Stop,} from '@prisma/client'
import {PrismaService} from "@bb/backend/core";

@Injectable()
export class StopsRepository {
   constructor(private prisma: PrismaService) {
   }

   async getStop(StopWhereUniqueInput: Prisma.StopWhereUniqueInput): Promise<Stop|null> {
     return this.prisma.stop.findUnique({
       where: StopWhereUniqueInput
     })
   }

   async getStops(params: {
     skip?: number
     take?: number
     cursor?: Prisma.StopWhereUniqueInput,
     where?: Prisma.StopWhereInput,
     orderBy?: Prisma.StopOrderByWithRelationInput
   }): Promise<Stop[]>{
     const {skip, take, cursor, where, orderBy} = params
     return this.prisma.stop.findMany({
       skip,
       take,
       cursor,
       where,
       orderBy
     })
   }

  async addStop(data: Prisma.StopCreateInput): Promise<Stop> {
    return this.prisma.stop.create({data});
  }

  async updateStop(params: {
    where: Prisma.StopWhereUniqueInput;
    data: Prisma.StopUpdateInput;
  }): Promise<Stop> {
    const { where, data } = params;
    return this.prisma.stop.update({
      data,
      where,
    });
  }

  async deleteStop(where: Prisma.StopWhereUniqueInput): Promise<Stop> {
    return this.prisma.stop.delete({
      where,
    });
  }

}
