import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app-component/app.component';
import { SearchPanelComponent } from './components/search-panel/search-panel.component';
import { DateItemComponent } from './components/date-item/date-item.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CurrentDayDirective } from './directives-pipes/current-day.directive';
import { QuickAddEventComponent } from './components/quick-add-event/quick-add-event.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { SearchEventsPopupComponent } from './components/search-events-popup/search-events-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchPanelComponent,
    DateItemComponent,
    CalendarComponent,
    CurrentDayDirective,
    QuickAddEventComponent,
    AddEventComponent,
    SearchEventsPopupComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
