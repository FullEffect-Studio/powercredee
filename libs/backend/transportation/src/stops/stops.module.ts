import {Module} from "@nestjs/common";
import {StopsController} from "./stops.controller";
import {StopsRepository} from "./stops.repository";

@Module({
  imports: [],
  controllers: [StopsController],
  providers: [StopsRepository]
})
export class StopsModule {

}
