import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gro-address-edit',
  templateUrl: 'address-detail.component.html',
  styleUrls: ['address-detail.component.scss']
})
export class AddressDetailComponent implements OnInit {
  edit_main_details = false;
  user_address: FormGroup;
  constructor(private fb: FormBuilder, private _route: Router,
    private _activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user_address = this.fb.group({
      name: ['Srikanth K', Validators.required],
      phone_number: ['7299933974', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      doorNo: ['', Validators.required],
      apartment: [''],
      street: ['', Validators.required],
      landmark: [''],
      area: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      address_type: ['home'],
      default_address: [false]
    });
    this._activatedRoute.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
    });
  }

  onSubmit(address, isValid) {
    console.log('is valid ', isValid);
    console.log('address ', address);
    if (isValid) {
      this._route.navigate(['/address']);
    }
  }
}
