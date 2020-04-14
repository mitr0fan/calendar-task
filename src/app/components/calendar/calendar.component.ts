import { Component, OnInit } from '@angular/core';
import { CreateCalendarService } from 'src/app/services/create-calendar.service';
import { Month } from 'src/app/types/month';
import { CONSTANTS } from 'src/app/constants/constants';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  month: Month = {date: [], events: []};
  currentDate: string;

  constructor(private createCalendar: CreateCalendarService) { }

  ngOnInit() {
    this.month.date = this.createCalendar.createMonth(new Date());
    this.changeCurrentDate();
  }

  changeCurrentDate() {
    this.currentDate = `${
      CONSTANTS.MONTHS[this.month.date[10].getMonth()]
      } ${
        this.month.date[10].getFullYear()
      }`;
  }

  previousMonth() {
    this.month.date = this.createCalendar.previousMonth(this.month.date[10]);
    this.changeCurrentDate();
  }

  nextMonth() {
    this.month.date = this.createCalendar.nextMonth(this.month.date[10]);
    this.changeCurrentDate();
  }

  today() {
    this.month.date = this.createCalendar.createMonth(new Date());
    this.changeCurrentDate();
  }
}
