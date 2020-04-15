import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addToLS(value) {
    const jsonValue = JSON.stringify(value);
    localStorage.setItem(CONSTANTS.LOCAL_STORAGE, jsonValue);
  }

  getEvents() {
    if (localStorage.getItem(CONSTANTS.LOCAL_STORAGE)) {
      return JSON.parse(localStorage.getItem(CONSTANTS.LOCAL_STORAGE));
    } else {
      return;
    }
  }
}
