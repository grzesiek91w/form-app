export type ClientType = 'PERSON' | 'COMPANY';
export type ConsentScope = 'MARKETING' | 'LEGAL' | 'TECH';

export interface ConsentDto {
  readonly id: string;
  readonly code: string;
  readonly title: string;
  readonly description?: string;
  readonly required: boolean;
  readonly inUse: boolean;
  readonly scope: ConsentScope;
}

export interface PersonData {
  type: Extract<ClientType, 'PERSON'>;
  firstName: string;
  lastName: string;
}

export interface CompanyData {
  type: Extract<ClientType, 'COMPANY'>;
  companyName: string;
  nip: string;
}


export type Step1AllKeys = keyof PersonData | keyof CompanyData | 'email';

export type Step1Value = { email: string } & (PersonData | CompanyData);

export interface ClientFormValue {
  step1: Step1Value;
  step2: {
    consents: Record<string, boolean>;
  };
}
