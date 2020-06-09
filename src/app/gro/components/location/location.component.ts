import { Component } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { CommonService } from '../../services/common.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'gro-location',
  templateUrl: 'location.component.html',
  styleUrls: ['location.component.scss']
})
export class LocationComponent {
  searchKey: string = '';
  user = localStorage.getItem('currentUser');
  stores = [];

  constructor(private _storeService: StoreService,
    private _commonService: CommonService,
    private _activeModal: NgbActiveModal) {

  }

  loadStores(searchKey: string) {
    this._storeService.getStores(searchKey).subscribe((result: any) => {

      this._commonService.loadStores$.next({
        location: searchKey,
        data: result
      });
      this._activeModal.dismiss();
    }, () => {
      this._activeModal.dismiss();
    });
  }
}
