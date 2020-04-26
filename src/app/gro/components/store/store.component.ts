import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'gro-store',
  templateUrl: 'store.component.html',
  styleUrls: ['store.component.scss']
})
export class GroStoreComponent implements OnInit {

  @Input('stores') storesListed;

  constructor() { }

  ngOnInit() {
    // this.storesListed = result.Store_list;
  }
}
