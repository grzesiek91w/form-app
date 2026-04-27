import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, ControlContainer } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ClientFormService } from '../../services/client-form';
import { ClientType, Step1AllKeys } from '../../models/client';

@Component({
  selector: 'app-step-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, SelectModule],
  viewProviders: [{
    provide: ControlContainer,
    useFactory: () => inject(ControlContainer, { skipSelf: true })
  }],
  templateUrl: './step-details.html'
})
export class StepDetailsComponent {
  protected formService = inject(ClientFormService);

  readonly clientTypes: { label: string; value: ClientType }[] = [
    { label: 'Osoba prywatna', value: 'PERSON' },
    { label: 'Firma', value: 'COMPANY' }
  ];


  isInvalid(controlName: Step1AllKeys): boolean {
    const control = this.formService.form.controls.step1.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  get currentType(): ClientType {
    return this.formService.form.controls.step1.controls.type.value;
  }
}
