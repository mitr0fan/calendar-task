import { Component, OnInit } from '@angular/core';
import { SearchPanelComponent } from '../search-panel/search-panel.component';
import { EventsService } from 'src/app/services/events.service';
import { Event as EventInterface } from 'src/app/types/event';
import isExists from 'date-fns/isExists';

@Component({
    selector: 'app-quick-add-event',
    templateUrl: './quick-add-event.component.html',
    styleUrls: ['./quick-add-event.component.scss'],
})
export class QuickAddEventComponent implements OnInit {
    parent: SearchPanelComponent;
    event: Event;
    coords: { x: number; y: number };
    eventData: string;

    constructor(private eventsService: EventsService) {}

    ngOnInit() {
        const target: HTMLButtonElement = this.event
            .target as HTMLButtonElement;
        this.coords = {
            x: target.getBoundingClientRect().left + pageXOffset,

            y:
                target.getBoundingClientRect().top +
                pageYOffset +
                target.getBoundingClientRect().height +
                15,
        };
    }

    addEvent() {
        if (this.eventData) {
            const year = this.eventData.split(',')[0].slice(6);
            const month = this.eventData.split(',')[0].slice(3, 5);
            const day = this.eventData.split(',')[0].slice(0, 2);
            if (this.eventData.split(',')[1]) {
                if (isExists(+year, +month - 1, +day)) {
                    const newEvent: EventInterface = {
                        name: this.eventData.split(',')[1],
                        date: new Date(`${month}.${day}.${year}`),
                        participants: [],
                        description: '',
                    };
                    this.eventsService.addEvent(
                        `${day}.${month}.${year}`,
                        newEvent
                    );
                    this.eventsService.changeEvent$.next('change');
                    this.close();
                } else {
                    alert('Неверная дата!');
                }
            } else {
                alert('Введите название события!');
            }
        }
    }

    close() {
        this.parent.closeEventEditor();
    }
}
