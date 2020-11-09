import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { CONSTANTS } from 'src/app/constants/constants';
import { Themes } from 'src/app/constants/themes';
import { ThemeService } from 'src/app/services/theme.service';
import { Event } from 'src/app/types/event';

@Component({
    selector: 'app-date-item',
    templateUrl: './date-item.component.html',
    styleUrls: ['./date-item.component.scss'],
})
export class DateItemComponent implements OnInit, OnDestroy {
    @Input() day: Date;
    @Input() index: number;
    @Input() event: Event;
    daysOfWeek = CONSTANTS.DAYS_OF_WEEK;
    theme$ = new BehaviorSubject<Themes>(Themes.default);
    onDestroy$ = new Subject();
    themeClasses = {
        [Themes.default]: 'day',
        [Themes.dark]: 'day_dark'
    };

    constructor(private themeService: ThemeService) {}

    ngOnInit() {
        this.themeService.currentTheme$
            .pipe(
                takeUntil(this.onDestroy$),
                tap(value => {
                    this.theme$.next(value);
                })
            )
            .subscribe();
    }

    ngOnDestroy() {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }
}
