import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoreItemsService } from 'src/app/gro/services/store-items.service';
import { debounceTime } from 'rxjs/operators';
import { CartService } from 'src/app/gro/services/cart.service';

@Component({
  selector: 'gro-store-search',
  templateUrl: 'search-store.component.html',
  styleUrls: ['search-store.component.scss']
})
export class SearchStoreComponent implements OnInit {
  results: any[] = [];
  queryField: FormControl = new FormControl();

  constructor(private _storeService: StoreItemsService) { }

  ngOnInit() {
    this.queryField.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((result) => {
        if (result && result.length) {
          this._storeService.searchStore(result)
            .subscribe((response: any[]) => {
              console.log('resp ', response);
              this.results = response;
            })
        } else {
          this.results = [];
        }
      })
  }
}
