import { Component, Input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ConsentDto } from '../../models/client';
import { ClientFormService } from '../../services/client-form';

@Component({
  selector: 'app-step-consents',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './step-consents.html'
})
export class StepConsentsComponent {
  protected formService = inject(ClientFormService);


  @Input({ required: true }) consents: ConsentDto[] = [];


  getGroupedConsents() {
    return [
      { label: 'Wymagane prawne', items: this.consents.filter(c => c.scope === 'LEGAL') },
      { label: 'Marketing', items: this.consents.filter(c => c.scope === 'MARKETING') },
      { label: 'Techniczne', items: this.consents.filter(c => c.scope === 'TECH') }
    ].filter(g => g.items.length > 0);
  }

  get consentsFormRecord() {
    return this.formService.form.controls.step2.controls.consents;
  }
}

