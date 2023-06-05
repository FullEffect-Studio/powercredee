import {Body, Controller, Delete, Get, Param, Patch, Post,} from '@nestjs/common';
import {StopsRepository} from './stops.repository';
import {AddStopDto, UpdateStopDto} from '@bb/shared/dtos';
import {Stop} from '@prisma/client';
import {v4} from 'uuid';
import {ApiBody, ApiTags} from '@nestjs/swagger';

@ApiTags('stops')
@Controller('stops')
export class StopsController {
  constructor(private readonly repository: StopsRepository) {}

  @Get()
  getDrivers() {
    return this.repository.getStops({
      // where: {schoolId : {equals: ''} }
    });
  }

  @Get(':id')
  getDriverById(@Param('id') stopId: string) {
    return this.repository.getStop({
      id: stopId,
    });
  }

  @ApiBody({ type: AddStopDto, description: 'Add Stop', required: true })
  @Post()
  addDriver(@Body() payload: AddStopDto) {
    console.log('payload', payload);
    const {
      customName,
      lng,
      lat,
      placeGeoId,
      placeGeoName,
      geofenceRadius,
    } = payload;
    return this.repository.addStop({
      customName,
      schoolId: v4(),
      lat,
      lng,
      placeGeoId,
      placeGeoName,
      geofenceRadius,
    });
  }

  @Patch(':id')
  async updateStop(@Body() payload: UpdateStopDto) {
    const { customName, placeGeoName, placeGeoId, lng, lat, id, geofenceRadius } = payload;

    return this.repository.updateStop({
      where: {
        id,
      },
      data: {
        customName,
        placeGeoName,
        geofenceRadius,
        lng,
        lat,
        placeGeoId
      },
    });
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Stop> {
    return this.repository.deleteStop({ id });
  }
}
