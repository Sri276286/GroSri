import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/gro/services/category.service';

@Component({
  selector: 'gro-category-store',
  templateUrl: 'category-store.component.html',
  styleUrls: ['category-store.component.scss']
})
export class GroCategoryStoreComponent implements OnInit {
  categoryStores = [];
  categoryName: string = '';
  constructor(private _route: ActivatedRoute,
    private _categoryService: CategoryService) {
  }

  ngOnInit() {
    this._route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      this._categoryService.getStoresByCategory(id).subscribe((res: any) => {
        this.categoryName = res && res.categoryName;
        this.categoryStores = res && res.storeLst;
      })
    });
  }
}
