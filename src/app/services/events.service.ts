import { Injectable } from '@angular/core';
import { Event } from '../types/event';
import { EventsStore } from '../types/events-store';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private events: EventsStore = {};

  changeEvent$: BehaviorSubject<string> = new BehaviorSubject('change');

  constructor(private ls: LocalStorageService) {
    if (this.ls.getEvents()) {
      this.events = this.ls.getEvents();
      this.changeEvent$.next('change');
    }
  }

  addEvent(date: string, event: Event) {
    this.events[date] = event;
    this.ls.addToLS(this.events);
  }

  removeEvent(date: string) {
    if (!this.events[date]) {
      return;
    }
    delete this.events[date];
    this.ls.addToLS(this.events);
  }

  getEvents() {
    return this.events;
  }
}
