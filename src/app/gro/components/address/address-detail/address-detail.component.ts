import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/gro/services/user.service';

@Component({
  selector: 'gro-address-edit',
  templateUrl: 'address-detail.component.html',
  styleUrls: ['address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  edit_main_details = false;
  user_address: FormGroup;
  isNewAddress: boolean = false;
  addressId = '';
  constructor(private fb: FormBuilder, private _route: Router,
    private _activatedRoute: ActivatedRoute,
    private _userService: UserService) {
  }

  ngOnInit() {
    this.user_address = this.fb.group({
      name: ['Srikanth K', Validators.required],
      phone_number: ['7299933974', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      flatNo: ['', Validators.required],
      apartment: [''],
      street: ['', Validators.required],
      landmark: [''],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      address_type: ['home'],
      primary_address: [false]
    });
    this._activatedRoute.paramMap.subscribe((paramMap) => {
      this.addressId = paramMap.get('id');
      if (this.addressId === 'new') {
        this.isNewAddress = true;
      } else {
        this.isNewAddress = false;
      }
    });
  }

  onSubmit(address, isValid) {
    console.log('is valid ', isValid);
    console.log('address ', address);
    if (isValid) {
      const addressObj = {
        addressId: this.addressId,
        ...address.value
      };
      if (this.isNewAddress) {
        this._userService.addAddress(addressObj).subscribe(() => {
          this._route.navigate(['/address']);
        });
      } else {
        this._userService.updateAddress(addressObj).subscribe(() => {
          this._route.navigate(['/address']);
        });
      }
    }
  }
}
