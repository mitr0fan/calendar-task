import { Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Themes } from 'src/app/constants/themes';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
    theme$ = new BehaviorSubject<Themes>(Themes.default);
    onDestroy$ = new Subject();
    classes = {
        [Themes.default]: 'container',
        [Themes.dark]: 'container_dark'
    };

    constructor(private themeService: ThemeService) {
        themeService.currentTheme$
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
