import {Module} from '@nestjs/common';
import {BackendCoreModule} from '@bb/backend/core';
import {DriversModule} from "./drivers/drivers.module";
import {StopsModule} from "./stops/stops.module";

@Module({
  imports: [
    BackendCoreModule,
    DriversModule,
    StopsModule
  ],
  exports: [],
})
export class BackendTransportationModule {}
