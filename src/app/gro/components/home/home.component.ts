import { Component } from '@angular/core';

@Component({
  selector: 'gro-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class GroHomeComponent {
  title = 'grosri';

  constructor() {
  }

  detect() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        console.log('pos ', pos);
      });
    } else {
    }
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      console.log('pos ', pos.coords.latitude, pos.coords.longitude);
      console.log('url ', 'https://api.opencagedata.com/geocode/v1/json?q=' + pos.coords.latitude + '+' + pos.coords.longitude + '&key=f391d83cebb04862a10911d13ef190f5');
      // reverse geocoding
      const apiByLatLon = 'https://api.opencagedata.com/geocode/v1/json?q=' + pos.coords.latitude + '+' + pos.coords.longitude + '&key=f391d83cebb04862a10911d13ef190f5';
      // forward geocoding
      const apiByPlace = 'https://api.opencagedata.com/geocode/v1/json?q=' + 'Tenali' + '&key=f391d83cebb04862a10911d13ef190f5';
      fetch(apiByPlace).then((res) => {
        return res.json();
      }).then((data) => {
        console.log('data ', data);
      });
    });
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  // console.log('dis ', getDistanceFromLatLonInKm(16.2422735, 80.64024549999999, 16.3, 80.45));

  selectStore() {
    console.log('store');
    // this._router.navigate(['store'], {})
  }
}
