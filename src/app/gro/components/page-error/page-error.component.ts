import { Component, Input } from '@angular/core';

@Component({
  selector: 'gro-page-error',
  templateUrl: 'page-error.component.html',
  styleUrls: ['page-error.component.scss']
})
export class PageErrorComponent {
@Input('message') displayMessage;
@Input('actiontext') actiontext;

constructor() {
}
}
