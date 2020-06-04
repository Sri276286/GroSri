import { Component } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocationComponent } from '../location/location.component';

@Component({
  selector: 'gro-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public _commonService: CommonService,
    private modal: NgbModal) { }

  handleLocation() {
    this.modal.open(LocationComponent, { centered: true });
  }
}
