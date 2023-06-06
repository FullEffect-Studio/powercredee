

export class AddStopDto {
  customName: string;

  placeGeoId: string;

  lat: number;

  lng: number;

  placeGeoName: string;


  geofenceRadius: number;
}

export class UpdateStopDto {
  id: string;

  customName: string;

  placeGeoId: string;

  lat: number;

  lng: number;

  placeGeoName: string;

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
