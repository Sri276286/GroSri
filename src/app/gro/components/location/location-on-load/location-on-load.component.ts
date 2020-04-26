import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'gro-location-on-load',
  templateUrl: 'location-on-load.component.html',
  styleUrls: ['location-on-load.component.scss']
})
export class LocationOnLoadComponent {
  @Output() search = new EventEmitter();
  searchKey: string = '';

  triggerSearch() {
    console.log('saerch key ', this.searchKey);
    this.search.emit(this.searchKey);
  }
}
