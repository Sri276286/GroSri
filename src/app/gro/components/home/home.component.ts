import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { StoreService } from '../../services/store.service';
import { LoginService } from '../../../common/services/login.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'gro-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class GroHomeComponent implements OnInit, AfterViewInit {
  stores = [];
  user = localStorage.getItem('currentUser');
  public isLoggedIn: boolean = false;
  public favorites = [];
  searchKey: string = '';
  @ViewChild('pincodeModal') pincodeModal;

  constructor(private _commonService: CommonService,
    private _storeService: StoreService,
    private _loginService: LoginService,
    private spinner: NgxSpinnerService,
    private _modal: NgbModal) {
  }

  ngOnInit() {
    this.isLoggedIn = this._loginService.isLogin();
    if (this.isLoggedIn) {
      this._storeService.getFavStores().subscribe((res: any) => {
        this.favorites = res && res.storeDetails;
      });
    }
    // load stores from location search
    this._commonService.loadStores$.subscribe((result) => {
      if (result) {
        this.getStores(result.location, result.data);
      }
    });
  }

  ngAfterViewInit() {
    const profile = JSON.parse(this.user);
    const location = profile && profile.location || localStorage.getItem('userLocation');
    if (!location) {
      this._modal.open(this.pincodeModal, { centered: true });
    } else {
      this._commonService.userLocation = location;
      this.loadStores(location);
    }
  }

  loadStores(searchKey: string) {
    this._storeService.getStores(searchKey).subscribe((result: any) => {
      this.getStores(searchKey, result);
      this.spinner.hide();
      this._modal.dismissAll();
    }, () => {
      this._modal.dismissAll();
    });
  }

  getStores(searchKey, result) {
    this._commonService.userLocation = searchKey;
    if (this.user) {
      this._commonService.handleUserStorage('location', searchKey);
    }
    localStorage.setItem('userLocation', searchKey);
    this.stores = result && result.storeLst ? result.storeLst : [];
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
