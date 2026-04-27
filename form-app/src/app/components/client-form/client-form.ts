import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, distinctUntilChanged, map, shareReplay, startWith, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';


import { ClientFormService } from '../../services/client-form';
import { ConsentsApiService } from '../../services/consents-api';
import { StepDetailsComponent } from '../step-details/step-details';
import { StepConsentsComponent } from '../step-consents/step-consents';
import { ConsentDto, ClientFormValue, CompanyData, PersonData } from '../../models/client';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StepperModule,
    ButtonModule,
    StepDetailsComponent,
    StepConsentsComponent
  ],
  templateUrl: './client-form.html',
  styleUrls: ['./client-form.css']
})
export class ClientFormComponent {
  protected formService = inject(ClientFormService);
  private consentsApi = inject(ConsentsApiService);



  activeIndex = signal(0);


  consents$ = this.consentsApi.getConsents().pipe(
    map(consents => consents.filter(c => c.inUse)),
    tap(consents => this.buildConsentControls(consents)),
    shareReplay(1)
  );


  requiredMissingCount = toSignal(
    combineLatest([
      this.consents$,
      this.formService.form.controls.step2.controls.consents.valueChanges.pipe(
        startWith(this.formService.form.controls.step2.controls.consents.value)
      )
    ]).pipe(
      map(([consents, currentValues]) => {

        return consents.filter(c => c.required && !currentValues[c.id]).length;
      })
    ), { initialValue: 0 }
  );

  /**
   * Buduje kontrolki w FormRecord na podstawie danych z API
   */
  private buildConsentControls(consents: ConsentDto[]) {
    const consentsGroup = this.formService.form.controls.step2.controls.consents;
    consents.forEach(c => {
      if (!consentsGroup.get(c.id)) {
        consentsGroup.setControl(
          c.id,
          new FormControl<boolean>(false, {
            nonNullable: true,
            validators: c.required ? [Validators.requiredTrue] : []
          })
        );
      }
    });
  }

  /**
   * Nawigacja do Kroku 2 z walidacją Kroku 1
   */
  nextStep(activateCallback: (step: number) => void) {
    const step1 = this.formService.form.controls.step1;
    if (step1.valid) {
      this.activeIndex.set(1);
      activateCallback(1);
    } else {
      step1.markAllAsTouched();
    }
  }

  /**
   * Powrót do Kroku 1
   */
  prevStep(activateCallback: (step: number) => void) {
    this.activeIndex.set(0);
    activateCallback(0);
  }


  readonly isStep1Valid = toSignal(
    this.formService.form.controls.step1.statusChanges.pipe(
      startWith(this.formService.form.controls.step1.status),
      distinctUntilChanged(),
      map(status => status === 'VALID')
    ),
    { initialValue: this.formService.form.controls.step1.valid }
  );


  readonly isFormValid = toSignal(
    this.formService.form.statusChanges.pipe(
      startWith(this.formService.form.status),
      distinctUntilChanged(),
      map(status => status === 'VALID')
    ),
    { initialValue: this.formService.form.valid }
  );

  /**
   * Zapis danych
   */
  onSave() {
    if (this.formService.form.valid) {
      const rawValue = this.formService.form.getRawValue() as ClientFormValue;



      const clientData = rawValue.step1;

      if (clientData.type === 'COMPANY') {

        this.handleCompanyRegistration(clientData);
      } else {

        this.handlePersonRegistration(clientData);
      }

      alert('Zapisano dane! Szczegóły w konsoli.');
    } else {
      this.formService.form.markAllAsTouched();
    }
  }


  private handleCompanyRegistration(data: CompanyData) {
    console.log('Rejestruję firmę:', data.companyName, 'NIP:', data.nip);
  }

  private handlePersonRegistration(data: PersonData) {
    console.log('Rejestruję osobę:', data.firstName, data.lastName);
  }
}
