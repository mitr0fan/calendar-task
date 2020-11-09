import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Themes } from '../constants/themes';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {
    currentTheme$ = new BehaviorSubject<Themes>(Themes.default);

    constructor() { }

    changeTheme() {
        const theme: Themes = this.currentTheme$.getValue() === Themes.default
            ? Themes.dark
            : Themes.default;

        this.currentTheme$.next(theme);
    }
}
