import { Injectable, inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ClientType } from '../models/client';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClientFormService {
  private fb = inject(FormBuilder);


  readonly form = this.fb.group({
    step1: this.fb.group({
      type: new FormControl<ClientType>('PERSON', { nonNullable: true }),
      firstName: new FormControl('', { nonNullable: true }),
      lastName: new FormControl('', { nonNullable: true }),
      companyName: new FormControl('', { nonNullable: true }),
      nip: new FormControl('', { nonNullable: true }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email]
      })
    }),
    step2: this.fb.group({

      consents: this.fb.record<FormControl<boolean>>({})
    })
  });

  constructor() {
    this.setupConditionalValidation();
  }

  private setupConditionalValidation() {
    const step1 = this.form.controls.step1;


    step1.controls.type.valueChanges.subscribe(type => {
      if (type === 'PERSON') {
        this.activatePersonFields();
      } else {
        this.activateCompanyFields();
      }
    });


    this.activatePersonFields();
  }

  private activatePersonFields() {
    const s1 = this.form.controls.step1;


    this.setControlState(s1.controls.firstName, true, [Validators.required, Validators.minLength(2)]);
    this.setControlState(s1.controls.lastName, true, [Validators.required, Validators.minLength(2)]);


    this.setControlState(s1.controls.companyName, false);
    this.setControlState(s1.controls.nip, false);
  }

  private activateCompanyFields() {
    const s1 = this.form.controls.step1;


    this.setControlState(s1.controls.firstName, false);
    this.setControlState(s1.controls.lastName, false);


    this.setControlState(s1.controls.companyName, true, [Validators.required, Validators.minLength(2)]);
    this.setControlState(s1.controls.nip, true, [Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
  }

  /**
   * Metoda do zarządzania stanem kontrolki
   */
  private setControlState(control: FormControl, activate: boolean, validators: any[] = []) {
    if (activate) {
      control.enable({ emitEvent: false });
      control.setValidators(validators);
    } else {
      control.disable({ emitEvent: false });
      control.clearValidators();
      control.setValue('');
    }
    control.updateValueAndValidity({ emitEvent: false });
  }
}
