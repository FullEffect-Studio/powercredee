import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Options} from 'ngx-google-places-autocomplete/objects/options/options';
import {GooglePlaceDirective} from 'ngx-google-places-autocomplete';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {NzNotificationService} from 'ng-zorro-antd/notification';
import {CircleMarkerDto, StopDto, UpdateStopDto} from '@bb/shared/dtos';
import {GoogleMap, MapGeocoder} from "@angular/google-maps";
import {FeMessagesService, StopsService} from '@bb/web/core';
import {MapMarkerDto} from "../add-stop/add-stop.component";

@Component({
  selector: 'bb-edit-stop',
  templateUrl: './edit-stop.component.html',
  styleUrls: ['./edit-stop.component.css']
})
export class EditStopComponent implements OnInit {
  @Input()
  show = false;
  @Output()
  hide = new EventEmitter(true);

  @Output()
  mapInitialized = new EventEmitter(true);

  form = this.formBuilder.group({
    customName: ['', []],
    placeName: ['', [Validators.required]],
    placeId: ['', [Validators.required]],
    lat: [0.00, [Validators.required]],
    lng: [0.00, [Validators.required]],
    radius: [30, [Validators.required]],
  });
  placeOptions: Options = new Options({
    componentRestrictions: {country: 'GH'}
  })

  selectedGeolocation!: Partial<Address> ;

  @ViewChild('placesRef')
  placesRef!: GooglePlaceDirective;

  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0
  };
  zoom = 19;
  markers : MapMarkerDto[] = [];
  circles: CircleMarkerDto[] = [];
  customName = this.form.get('customName');
  placeName = this.form.get('placeName');
  radius = this.form.get('radius');

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  tempAddress! :  Partial<Address>;

  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    maxZoom: 50,
    minZoom: 8,
  };

  circleOptions: google.maps.CircleOptions = {
    radius: this.radius?.value || 5000,
    fillColor: 'green'
  }

  constructor(private formBuilder: FormBuilder,
              private placeService: StopsService,
              private geocoder: MapGeocoder,
              private notification: NzNotificationService,
              private feMessages: FeMessagesService) {
  }



  private _stop!: StopDto;

  get stop(): StopDto {
    return this._stop;
  }

  @Input()
  set stop(value: StopDto) {
    if (value) {
      this._stop = value;
      this.customName?.setValue(value.customName );
      this.placeName?.setValue(value.placeGeoName);
      this.form.get('placeId')?.setValue(value.placeGeoId);
      this.form.get('lat')?.setValue(value.lat);
      this.form.get('lng')?.setValue(value.lng);
      this.radius?.setValue(value.geofenceRadius);

      console.log('selected place has been set', this.form.value);

      const request : google.maps.GeocoderRequest ={
        // componentRestrictions: {country: 'GH'},
        // placeId: value.placeGeoId,
        location: new google.maps.LatLng({lat: value.lat, lng: value.lng}),
        // address: value.placeGeoName,
        language: 'en'
      }
      this.geocoder.geocode(request).subscribe(response => {
        console.log('geocoder response', response)
      })

      const addr: Partial<Address>= {
        place_id: value.placeGeoId,
        name: value.placeGeoName,
        geometry: {
          location: new google.maps.LatLng({lat: value.lat, lng: value.lng}),
          viewport: new google.maps.LatLngBounds()
        }
      };

      this.tempAddress = addr;


    }
  }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
    });


    this.radius?.valueChanges.subscribe((val) => {
      if (this.circles[0]) {
        this.circles[0].radius = val || 0;
        console.log('radius set', this.radius?.value);
      }
    });

    setInterval(() => {
        if(this.map){
          this.map.panTo(this.center)
        }
    }, 2000)

  }



  closeDrawer() {
    this.hide.emit(true);
    this.show = false;
  }

  saveChanges() {
    this.feMessages.emitError([]);
    const payload: UpdateStopDto = {
      id: this.stop.id,
      customName: <string>this.form.get('customName')?.value,
      placeGeoId: <string>this.form.get('placeId')?.value,
      lng: <number>this.form.get('lng')?.value,
      lat: <number>this.form.get('lat')?.value,
      placeGeoName: <string>this.form.get('placeName')?.value,
      geofenceRadius: <number>this.form.get('radius')?.value
    };


    this.placeService.editTerminal(payload).subscribe(
      () => {
        this.placeService.clearCache();
        this.placeService.get().subscribe();
        this.show = false;
        this.closeDrawer();
        this.notification.success('Changes saved', '');
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

  public handleAddressChange(address: Partial<Address>) {
    console.log('handleAddressChange triggered');
    this.selectedGeolocation = address;
    this.form.get('placeName')?.setValue(address.name || '');
    this.form.get('placeId')?.setValue(address.place_id || '');
    this.form.get('lat')?.setValue(address.geometry?.location.lat() || 0);
    this.form.get('lng')?.setValue(address.geometry?.location.lng() || 0);

    this.addMarker(address);
    this.addCircle(address);
    this.center.lng = <number>address.geometry?.location.lng();
    this.center.lat = <number>address.geometry?.location.lat();
    this.map?.panTo(this.center)
  }

  addMarker(address: Partial<Address>) {
    this.markers = [];
    this.markers.push({
      position: {
        lat: address.geometry?.location.lat() || 0,
        lng: <number>address.geometry?.location.lng()
      },
      label: {
        color: 'green',
        text: 'Marker label ' + (this.markers.length + 1)
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.BOUNCE
      }
    });

  }

  addCircle(address: Partial<Address>) {
    this.circles = [];
    this.circles.push({
      lat: <number>address.geometry?.location.lat(),
      lng: <number>address.geometry?.location.lng(),
      id: '',
      name: <string>address.name ,
      color: 'green',
      type: '',
      radius: <number>this.radius?.value,
      routeId: null
    });
  }

  onMapReady($event: any) {
    this.mapInitialized.emit(true);

    this.handleAddressChange(this.tempAddress);
  }
}
