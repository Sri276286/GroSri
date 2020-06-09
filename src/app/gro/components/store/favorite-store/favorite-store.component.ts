import { Component, OnInit } from '@angular/core';
import { StoreService } from 'src/app/gro/services/store.service';

@Component({
  selector: 'gro-fav-store',
  templateUrl: 'favorite-store.component.html',
  styleUrls: ['favorite-store.component.scss']
})
export class FavoriteStoreComponent implements OnInit {

  stores = [];
  constructor(private _service: StoreService) {
  }

  ngOnInit() {
    this._service.getFavStores().subscribe((res: any) => {
      this.stores = res && res.storeDetails;
    });
  }
}
