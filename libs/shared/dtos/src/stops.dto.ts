import {IsNotEmpty, IsOptional} from "class-validator";


export class AddStopDto {
  @IsOptional()
  customName: string;

  @IsNotEmpty()
  placeGeoId: string;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lng: number;

  @IsNotEmpty()
  placeGeoName: string;


  @IsNotEmpty()
  geofenceRadius: number;
}

export class UpdateStopDto {
  @IsNotEmpty()
  id: string;

  @IsOptional()
  customName: string;

  @IsNotEmpty()
  placeGeoId: string;

  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lng: number;

  @IsNotEmpty()
  placeGeoName: string;

  @IsNotEmpty()
  geofenceRadius: number;
}



export class StopDto {
  id: string;
  customName: string;
  placeGeoId: string;
  schoolId?: string;
  lat: number;
  lng: number;
  geofenceRadius: number;
  placeGeoName: string;
}
