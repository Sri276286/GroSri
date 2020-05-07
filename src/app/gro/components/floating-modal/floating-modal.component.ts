import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'floating-modal',
  templateUrl: 'floating-modal.component.html',
  styleUrls: ['floating-modal.component.scss']
})
export class FloatingModalComponent {

  constructor(public activeModal: NgbActiveModal) {

  }
}
