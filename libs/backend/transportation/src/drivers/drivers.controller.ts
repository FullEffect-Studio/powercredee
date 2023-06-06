import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import { DriversRepository } from './drivers.repository';
import { AddBranchDto, EditBranchDto } from '@bb/shared/dtos';
import { Driver } from '@prisma/client';
import { v4 } from 'uuid';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('drivers')
@Controller('drivers')
export class DriversController {
  constructor(private readonly driversRepository: DriversRepository) {}

  @Get()
  getDrivers() {
    return this.driversRepository.drivers({
      // where: {schoolId : {equals: ''} }
    });
  }

  @Get(':id')
  getDriverById(@Param('id') driverId: string) {
    return this.driversRepository.driver({
      id: driverId,
    });
  }

  @ApiBody({ type: AddBranchDto, description: 'Add Driver', required: true, })
  @Post()
  addDriver(@Body() payload: AddBranchDto) {
    console.log('payload',payload)
    const {
      name,
      idCardNumber,
      licenseNumber,
      phone_number,
      licenseType,
      address,
    } = payload;
    return this.driversRepository.createDriver({
      name,
      address,
      phone_number: phoneNumber,
      schoolId: v4(),
      idCardNumber,
      licenseNumber,
      licenseType
    });
  }

  @Patch(":id")
  async updateInfo(@Body() payload: EditBranchDto) {
    const {
      name, address,phone_number,id
    } = payload;

    return this.driversRepository.updateDriver({
      where: {
        id
      },
      data: {
        name,
        phone_number: phoneNumber,
        address,
      }
    })
  }

  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<Driver> {
    return this.driversRepository.deleteDriver({id});
  }
}
