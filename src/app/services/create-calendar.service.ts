import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class CreateCalendarService {

  constructor() { }

  createMonth(date: Date) {
    const month = [];
    let firstDay: Date = new Date(date.getTime() - CONSTANTS.MS_IN_DAY * (date.getDate() - 1));
    if (firstDay.getDay() === 0) {
      firstDay = new Date(firstDay.getTime() - 6 * CONSTANTS.MS_IN_DAY);
    } else if (firstDay.getDay() > 0) {
      firstDay = new Date(firstDay.getTime() - (firstDay.getDay() - 1) * CONSTANTS.MS_IN_DAY);
    }
    for (let i = 0; i < 35; i++) {
      month.push(new Date(firstDay.getTime() + i * CONSTANTS.MS_IN_DAY));
    }
    return month;
  }

  nextMonth(date: Date) {
    const day = 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month !== 12) {
      month++;
    } else {
      month = 1;
      year++;
    }
    return this.createMonth(new Date(`${month}.${day}.${year}`));
  }

  previousMonth(date: Date) {
    const day = 1;
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (month !== 1) {
      month--;
    } else {
      month = 12;
      year--;
    }
    return this.createMonth(new Date(`${month}.${day}.${year}`));
  }
}
