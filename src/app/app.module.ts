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
import { HostDirective } from './directives-pipes/host.directive';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
    HostDirective,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [QuickAddEventComponent, AddEventComponent, SearchEventsPopupComponent]
})
export class AppModule { }
