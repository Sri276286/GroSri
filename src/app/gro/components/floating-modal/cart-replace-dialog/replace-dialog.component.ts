import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/gro/services/common.service';

@Component({
  selector: 'cart-replace-dialog',
  templateUrl: 'replace-dialog.component.html',
  styleUrls: ['replace-dialog.component.scss']
})
export class CartReplaceDialogComponent {

  constructor(public activeModal: NgbActiveModal,
    private _commonService: CommonService) {

  }

  proceed() {
    this._commonService.canProceedUpdatingCart = true;
    this._commonService.proceedUpdatingCart$.next(true);
    this.activeModal.close('Ok click');
  }
}
