import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NgProgress} from "ngx-progressbar";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzModalService} from "ng-zorro-antd/modal";
import {v4} from "uuid";
import {FeMessagesService, StopsQuery, StopsService} from '@bb/web/core';
import {AddStopDto, CircleMarkerDto} from '@bb/shared/dtos';
import {Options} from 'ngx-google-places-autocomplete/objects/options/options';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from "ngx-google-places-autocomplete/objects/address";
import {GoogleMap} from "@angular/google-maps";

export interface MapMarkerDto {
  position: google.maps.LatLngLiteral | google.maps.LatLng;
  label: { color: string; text: string };
  title: string;
  info: string;
  options: google.maps.MarkerOptions;
}

@Component({
  selector: 'bb-add-stop',
  templateUrl: './add-stop.component.html',
  styleUrls: ['./add-stop.component.scss'],
})
export class AddStopComponent implements OnInit{

  busIconUrl = '/assets/images/bus_icon.png';

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;

  @ViewChild("placesRef") placesRef! : GooglePlaceDirective;

  form = this.formBuilder.group({
    customName: ['', []],
    placeName: ['', [Validators.required]],
    placeId: ['', [Validators.required]],
    lat: [0.0, [Validators.required]],
    lng: [0.0, [Validators.required]],
    radius: [30, [Validators.required]],
  });

  customName = this.form.get('customName');
  placeName = this.form.get('placeName');
  radius = this.form.get('radius');

  placeOptions= new Options({
    componentRestrictions: {country: 'GH'}
  })


  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 50,
    minZoom: 8,
  };

  markerOption: google.maps.MarkerOptions = {
    animation: google.maps.Animation.DROP,
    icon: this.busIconUrl
  };

  circleOptions: google.maps.CircleOptions = {
    radius: this.radius?.value || 5000,
    fillColor: 'green'
  }


  center!: google.maps.LatLngLiteral | google.maps.LatLng
  zoom = 19;
  markers: MapMarkerDto[] = [];
  circles: CircleMarkerDto[] = [];

  selectedGeolocation!: Address;


  @Input() visible = false;
  @Output() hide = new EventEmitter<boolean>(true)
  constructor(
    private ngZone: NgZone,
    private formBuilder: FormBuilder,
    private placeService: StopsService,
    private placeQuery: StopsQuery,
    private ngProgress: NgProgress,
    private notification: NzNotificationService,
    private feMessages: FeMessagesService,
    private modal: NzModalService
  ) {

  }


  ngOnInit(): void {

    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this.radius?.valueChanges.subscribe((val) => {
      if (val) {
        this.circles[0].radius = val;
      }
    });
  }



  public handleAddressChange(placeResult: Address) {
    // console.log('address', placeResult)
    this.selectedGeolocation = placeResult;
    this.form.get('placeName')?.setValue(placeResult.name || null);
    this.form.get('placeId')?.setValue(placeResult.place_id || null);
    this.form.get('lat')?.setValue(placeResult.geometry?.location?.lat() || null);
    this.form.get('lng')?.setValue(placeResult.geometry?.location?.lng() || null);

    this.addMarker(placeResult);
    this.addCircle(placeResult);
    this.center.lng = placeResult.geometry?.location?.lng() || 0;
    this.center.lat = placeResult.geometry?.location?.lat() || 0;

    this.map.fitBounds(placeResult.geometry.viewport)
  }

  add() {
    this.feMessages.emitError([]);
    const payload: AddStopDto = {
      customName: <string>this.customName?.value,
      placeGeoId: <string>this.form.get('placeId')?.value,
      lng: <number>this.form.get('lng')?.value,
      lat: <number>this.form.get('lat')?.value,
      placeGeoName: <string>this.placeName?.value,
      geofenceRadius: <number>this.radius?.value,
    };

    this.placeService.add(payload).subscribe(
      () => {
        this.placeService.clearCache();
        this.placeService.get().subscribe();
        this.visible = false;
        this.form.reset();
        this.notification.success('Bus Stop has been added successfully', '');
        this.radius?.setValue(5000);
      },
      (err) => {
        this.feMessages.emitError(err.error.errorMessage);
        this.notification.error(
          'Ops! something went wrong',
          err.error.errorMessage
        );
      }
    );
  }



  addMarker(address: Address) {
    this.markers = [];
    this.markers.push({
      position: {
        lat: address.geometry?.location?.lat() || 0,
        lng: address.geometry?.location?.lng() || 0,
      },
      label: {
        color: 'green',
        text: address.name,
      },
      title: address.name,
      info: address.formatted_address,
      options: {
        animation: google.maps.Animation.BOUNCE,
      },
    });
  }

  addCircle(address: Address) {
    this.circles = [];
    this.circles.push({
      lat: address.geometry?.location?.lat() || 0,
      lng: address.geometry?.location?.lng() || 0,
      id: v4(),
      name: address.name || '',
      color: 'green',
      type: '',
      radius: <number>this.radius?.value,
      routeId: null,
    });
  }


  onClose() {
    this.visible = false;
    this.hide.emit(false)
  }
}
