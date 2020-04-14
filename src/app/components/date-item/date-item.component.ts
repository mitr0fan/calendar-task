import { Component, OnInit, Input } from '@angular/core';
import { CONSTANTS } from 'src/app/constants/constants';

@Component({
  selector: 'app-date-item',
  templateUrl: './date-item.component.html',
  styleUrls: ['./date-item.component.scss']
})
export class DateItemComponent implements OnInit {
  @Input() day: Date;
  @Input() index: number;
  daysOfWeek = CONSTANTS.DAYS_OF_WEEK;

  constructor() { }

  ngOnInit() {
  }

}
