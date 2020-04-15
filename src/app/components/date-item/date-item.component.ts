import { Component, OnInit, Input } from '@angular/core';
import { CONSTANTS } from 'src/app/constants/constants';
import { Event } from 'src/app/types/event';

@Component({
    selector: 'app-date-item',
    templateUrl: './date-item.component.html',
    styleUrls: ['./date-item.component.scss'],
})
export class DateItemComponent implements OnInit {
    @Input() day: Date;
    @Input() index: number;
    @Input() event: Event;
    daysOfWeek = CONSTANTS.DAYS_OF_WEEK;

    constructor() {}

    ngOnInit() {}
}
