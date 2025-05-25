import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  template: `
    <div class="modal-header bg-dark text-white">
      <h4 class="modal-title">🛑 Confirmation</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss()"></button>
    </div>
    <div class="modal-body bg-dark text-light">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer bg-dark">
      <button type="button" class="btn btn-outline-light" (click)="modal.dismiss()">Annuler</button>
      <button type="button" class="btn btn-danger" (click)="modal.close(true)">Supprimer</button>
    </div>
  `
})
export class ConfirmModalComponent {
  @Input() message = 'Êtes-vous sûr ?';
  constructor(public modal: NgbActiveModal) {}
}
