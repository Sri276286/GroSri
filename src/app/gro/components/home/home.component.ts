import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'gro-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class GroHomeComponent implements AfterViewInit {
  stores = [];
  user = localStorage.getItem('currentUser');
  @ViewChild('openModal') myModal;

  constructor(private _commonService: CommonService,
    private _storeService: StoreService) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const profile = JSON.parse(this.user);
      const location = profile && profile.location || localStorage.getItem('userLocation');
      console.log('location ', location);
      if (!location) {
        this.myModal.nativeElement.click();
      } else {
        this._commonService.userLocation = location;
        this.loadStores(location);
      }
    }, 1000);
  }

  loadStores(searchKey: string) {
    this._storeService.getStores(searchKey).subscribe((result: any) => {
      this._commonService.userLocation = searchKey;
      if (this.user) {
        this._commonService.handleUserStorage('location', searchKey);
      }
      localStorage.setItem('userLocation', searchKey);
      this.stores = result && result.storeDetails ? result.storeDetails : [];
      this.closeModal();
    });
  }

  openModal() {
    this.myModal.nativeElement.className = 'modal fade show';
  }
  closeModal() {
    this.myModal.nativeElement.className = 'modal hide';
  }

  detect() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
      });
    } else {
    }
  }

  getGeolocation() {
    navigator.geolocation.getCurrentPosition((pos) => {
      // reverse geocoding
      const apiByLatLon = 'https://api.opencagedata.com/geocode/v1/json?q=' + pos.coords.latitude + '+' + pos.coords.longitude + '&key=f391d83cebb04862a10911d13ef190f5';
      // forward geocoding
      const apiByPlace = 'https://api.opencagedata.com/geocode/v1/json?q=' + 'Tenali' + '&key=f391d83cebb04862a10911d13ef190f5';
      fetch(apiByPlace).then((res) => {
        return res.json();
      }).then((data) => {
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

}
