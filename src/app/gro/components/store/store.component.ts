import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'gro-store',
  templateUrl: 'store.component.html',
  styleUrls: ['store.component.scss']
})
export class GroStoreComponent implements OnInit {
  storesListed = [];

  constructor(private _storeService: StoreService) { }

  ngOnInit() {
    this._storeService.getStores().subscribe((result: any) => {
      this.storesListed = result.Store_list;
    });
  }
}
