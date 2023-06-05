import {Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/compat/firestore';
import {GpsService} from "../gps.service";
import {BusPosition} from "./busPosition";
import {GoogleMap, GoogleMapsModule, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'bb-simulator',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule,],
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss'],
})
export class SimulatorComponent {

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapMarker, { static: false }) marker!: MapMarker;

  busIconUrl = '/assets/images/bus_icon.png';
  zoom = 19;
  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  }

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    disableDefaultUI: true,
    maxZoom: 50,
    minZoom: 8,
  }

  infoContent = ''
  markerPosition: google.maps.LatLngLiteral = {
    lat: 0, lng:0
  }
  markerOption: google.maps.MarkerOptions = {
    icon: this.busIconUrl,

  }


  busPositionCollection: AngularFirestoreCollection<BusPosition> = this.db.collection('busPositions');
  busPositions$ = this.busPositionCollection.valueChanges()



  docId = 'ajhs8398sahj'
  currentBusPositionDoc:AngularFirestoreDocument<BusPosition> = this.db.doc(`busPositions/${this.docId}`)
  currentBusPosition$ = this.currentBusPositionDoc.valueChanges()



  constructor(private db: AngularFirestore, private gpsService: GpsService) {
    setInterval(() => {
      this.getCurrentPosition()
    }, 1);
  }

  getCurrentPosition() {
     navigator.geolocation.watchPosition(
        (position)=> {

          const payload: BusPosition = {
            busNo: 'A1111',
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            driverName: 'Kofi Adjei'
          }

          this.markerPosition ={lat: position.coords.latitude, lng: position.coords.longitude}

          this.markerOption.position = new google.maps.LatLng(this.markerPosition)

          this.createOrupdatePosition(payload)
        },
        (error) => {
          console.error('Error getting current position', error)
        }
      );
  }

  createOrupdatePosition(data: BusPosition) {
   this.currentBusPositionDoc.set(data)
  }

  updatePosition(data: BusPosition) {
    this.currentBusPositionDoc.update({driverName: 'Benji'})
  }

  deletePosition(){
    this.currentBusPositionDoc.delete()
  }

  onBusPositionChanged() {
    console.log('position changed')
    this.markerOption.animation =  google.maps.Animation.BOUNCE
    this.map.panTo(this.markerPosition)
  }
}
