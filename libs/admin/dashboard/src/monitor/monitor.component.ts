import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzListModule} from 'ng-zorro-antd/list';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';
import {StudentsStatusComponent} from '../components/students-status/students-status.component';
import {StudentsStatusByBusComponent} from '../components/students-status-by-bus/students-status-by-bus.component';
import {GoogleMap, GoogleMapsModule, MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'bb-monitor',
  standalone: true,
  imports: [
    CommonModule,
    NzAvatarModule,
    NzListModule,
    NzCardModule,
    NzBreadCrumbModule,
    StudentsStatusComponent,
    StudentsStatusByBusComponent,
    GoogleMapsModule,
  ],
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
})
export class MonitorComponent implements OnInit, AfterViewInit {
  busIconUrl = '/assets/images/bus_icon.png';

  @ViewChild(GoogleMap, { static: false }) map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow!: MapInfoWindow

  zoom = 19;
  center: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: false,
    disableDefaultUI: true,
    maxZoom: 50,
    minZoom: 8,
  };

  markerOption: google.maps.MarkerOptions = {
    animation: google.maps.Animation.DROP,
    icon: this.busIconUrl
  };
  today = Date.now();
  infoContent = ''
  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });
  }

  ngAfterViewInit(): void {
    console.log('center', this.map.getCenter());
  }

  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content

    this.infoWindow.open(marker)
  }
}
