import { Input, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ngrid2-modal',
    template: `
      <div class="modal-header">
        <h4 class="modal-title">{{header}}</h4>
        <button type="button" class="btn-danger close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="input-group">
          <textarea autofocus style="width:100%" rows="100" readonly="true" class="form-control">{{body}}</textarea>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
      </div>
    `
  })
  export class Ngrid2Modal {
    @Input() header;
    @Input() body;
  
    constructor(public activeModal: NgbActiveModal) {}
  }