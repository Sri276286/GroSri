import { Component } from '@angular/core';

@Component({
  selector: 'gro-base',
  templateUrl: './gro.component.html',
  styleUrls: ['./gro.component.scss']
})
export class GroComponent {
  location: string;

  constructor() {
    // this.getLocation();
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log('pos ', pos.coords.latitude, pos.coords.longitude);
      console.log('url ', 'https://api.opencagedata.com/geocode/v1/json?q=' + pos.coords.latitude + '+' + pos.coords.longitude + '&key=f391d83cebb04862a10911d13ef190f5');
      // reverse geocoding
      const apiByLatLon = 'https://api.opencagedata.com/geocode/v1/json?q=' + pos.coords.latitude + '+' + pos.coords.longitude + '&key=f391d83cebb04862a10911d13ef190f5';
      // forward geocoding
      const apiByPlace = 'https://api.opencagedata.com/geocode/v1/json?q=' + 'Tenali' + '&key=f391d83cebb04862a10911d13ef190f5';
      fetch(apiByLatLon).then((res) => {
        return res.json();
      }).then((data) => {
        console.log('data ', data);
        this.location = data.results[0].formatted;
      });
    });
  }

}
