import { Injectable } from '@angular/core';
import { Event } from '../types/event';
import { EventsStore } from '../types/events-store';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: EventsStore = {
    '15.04.2020': {
      name: 'kek',
      date: new Date(),
      participants: ['s', 'dd'],
      description: 'sdfv'
    }
  };

  changeEvent$: BehaviorSubject<string> = new BehaviorSubject('change');

  constructor() {}

  addEvent(date: string, event: Event) {
    this.events[date] = event;
  }

  removeEvent(date: string) {
    if (!this.events[date]) {
      return;
    }
    delete this.events[date];
  }

  getEvents() {
    return this.events;
  }
}
