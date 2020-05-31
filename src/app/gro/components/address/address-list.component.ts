import { Component } from '@angular/core';

@Component({
  selector: 'gro-address-list',
  templateUrl: 'address-list.component.html',
  styleUrls: ['address-list.component.scss']
})
export class AddressListComponent {
  is_default_address = 'default';
  user_address_data = [];

  constructor() {
    this.user_address_data[0] = {
      id: 1,
      name: 'Srikanth K',
      phone_number: '7299933974',
      doorNo: 'Plot 6',
      apartment: '',
      street: 'Selva Ganapathy Avenue',
      landmark: 'Sri Sai Nagar 7th cross road, Thoraipakkam',
      area: 'Perungudi',
      city: 'Chennai',
      pincode: '600096',
      address_type: 'home',
      default_address: true
    };
  }
}
