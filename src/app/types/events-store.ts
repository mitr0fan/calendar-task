import { Event } from './event';

export interface EventsStore {
    [date: string]: Event;
}
