import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { ConsentDto } from '../models/client';

@Injectable({ providedIn: 'root' })
export class ConsentsApiService {

  /**
   * Pobiera listę zgód z mockowego API.
   * delay(800) symuluje czas odpowiedzi serwera.
   */
  getConsents(): Observable<ConsentDto[]> {
    const mockData: ConsentDto[] = [
      {
        id: 'c1', code: 'MARK_1', title: 'Zgoda marketingowa',
        description: 'Chcę otrzymywać informacje o promocjach.',
        required: true, inUse: true, scope: 'MARKETING'
      },
      {
        id: 'c2', code: 'RODO', title: 'Przetwarzanie danych (RODO)',
        description: 'Niezbędne do realizacji usługi.',
        required: true, inUse: true, scope: 'LEGAL'
      },
      {
        id: 'c3', code: 'TECH_1', title: 'Powiadomienia techniczne',
        description: 'Informacje o przerwach w działaniu serwisu.',
        required: false, inUse: true, scope: 'TECH'
      },
      {
        id: 'c4', code: 'EXTRA', title: 'Zgoda archiwalna',
        required: false, inUse: false, scope: 'LEGAL'
      },
      {
        id: 'c5', code: 'MARK_2', title: 'Partnerzy Handlowi',
        description: 'Zgoda na kontakt ze strony naszych partnerów.',
        required: false, inUse: true, scope: 'MARKETING'
      },
      {
        id: 'c6', code: 'LEGAL_2', title: 'Regulamin Serwisu',
        description: 'Akceptuję warunki korzystania z platformy.',
        required: true, inUse: true, scope: 'LEGAL'
      }
    ];

    return of(mockData).pipe(delay(800));
  }
}
