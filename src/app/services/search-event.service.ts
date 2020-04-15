import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchEventService {
  searchValue$: Subject<string> = new Subject();

  constructor() { }
}
