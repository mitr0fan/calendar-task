import { Component, OnInit } from '@angular/core';
import { Event as EventInterface } from 'src/app/types/event';
import { Subscription } from 'rxjs';
import { SearchPanelComponent } from '../search-panel/search-panel.component';
import { EventsService } from 'src/app/services/events.service';
import { CreateCalendarService } from 'src/app/services/create-calendar.service';

@Component({
    selector: 'app-search-events-popup',
    templateUrl: './search-events-popup.component.html',
    styleUrls: ['./search-events-popup.component.scss'],
})
export class SearchEventsPopupComponent implements OnInit {
    events: EventInterface[];
    sub: Subscription;
    inputEvent: Event;
    x: number;
    parent: SearchPanelComponent;

    constructor(
        private eventsService: EventsService,
        private calendar: CreateCalendarService
    ) {}

    ngOnInit() {
        const t = this.inputEvent.target as HTMLElement;
        this.x = t.getBoundingClientRect().left + 1;

        document.onclick = () => {
            this.parent.closeSearchList();
        };
    }

    selectEvent(event: EventInterface) {
        this.calendar.changeMonth$.next(new Date(event.date));
        this.eventsService.changeEvent$.next('change');
        this.parent.closeSearchList();
    }
}
