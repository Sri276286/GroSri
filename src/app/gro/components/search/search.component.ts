import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'gro-search',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export class SearchComponent implements OnInit {
  results: any[] = [];
  queryField: FormControl = new FormControl();

  constructor(private _searchService: SearchService,
    private _route: Router) { }

  ngOnInit() {
    this.queryField.valueChanges
      .subscribe((result) => {
        if (result && result.length) {
          this._searchService.search(result)
            .subscribe((response: any[]) => {
              this.results = response;
            })
        } else {
          this.results = [];
        }
      })
  }

  searchClick(result) {
    const storeId = result.storeId || null;
    const categId = result.categoryId || null;
    if (storeId) {
      this._route.navigate(['/store', storeId]);
    }
  }
}
