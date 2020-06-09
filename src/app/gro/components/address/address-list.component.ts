import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'gro-address-list',
  templateUrl: 'address-list.component.html',
  styleUrls: ['address-list.component.scss']
})
export class AddressListComponent {
  is_default_address = 'default';
  user_address_data = [];

  constructor(private _userService: UserService) {
  }

  ngOnInit() {
    this._userService.getAddressList()
      .subscribe((res: any) => {
        this.user_address_data = res;
        localStorage.setItem('add_list', JSON.stringify(this.user_address_data));
      });
  }
}
