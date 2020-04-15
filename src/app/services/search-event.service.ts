import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { EventsService } from './events.service';
import { Event } from '../types/event';

@Injectable({
    providedIn: 'root',
})
export class SearchEventService {
    searchValue$: Subject<string> = new Subject();

    constructor(private eventsService: EventsService) {}

    searchEvent(value: string) {
        const events = this.eventsService.getEvents();
        const foundEvents: Event[] = [];
        for (const key in events) {
            if (events[key].name === value) {
                foundEvents.push(events[key]);
            } else if (value.length > 0 && key.includes(value)) {
                foundEvents.push(events[key]);
            } else if (
                events[key].name.toLowerCase().includes(value.toLowerCase())
            ) {
                foundEvents.push(events[key]);
            }
        }
        return foundEvents;
    }
}
