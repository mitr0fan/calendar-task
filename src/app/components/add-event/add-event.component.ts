import { Component, OnInit } from '@angular/core';
import { CalendarComponent } from '../calendar/calendar.component';
import { FormGroup, FormControl } from '@angular/forms';
import { Event as EventInterface } from 'src/app/types/event';
import { EventsService } from 'src/app/services/events.service';
import { DatePipe } from '@angular/common';
import isExists from 'date-fns/isExists';

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
    coords: { x: number; y: number } = { x: 0, y: 0 };
    eventClick: Event;
    parent: CalendarComponent;
    self: HTMLElement;
    pointerCoords: { x: number; y: number } = { x: 0, y: 0 };
    pointerHideCoords: { x: number; y: number } = { x: 0, y: 0 };
    event: EventInterface;
    form: FormGroup = new FormGroup({
        name: new FormControl(''),
        date: new FormControl(''),
        participants: new FormControl(''),
        description: new FormControl(''),
    });
    day: Date;

    constructor(
        private eventsService: EventsService,
        private datePipe: DatePipe
    ) {}

    ngOnInit() {
        this.setCoords();
        this.form.patchValue({
            date: this.datePipe.transform(this.day, 'dd.MM.yyyy'),
        });
        if (this.event) {
            this.form.setValue({
                ...this.event,
                date: this.datePipe.transform(this.day, 'dd.MM.yyyy'),
                participants: this.event.participants.join(', '),
            });
        }
    }

    close() {
        this.parent.closeAddEventPopup();
    }

    saveEvent() {
        if (typeof this.form.value.date === 'object') {
            this.form.value.date = this.datePipe.transform(
                this.form.value.date,
                'dd.MM.yyyy'
            );
        }
        const year = this.form.value.date.slice(6);
        const month = this.form.value.date.slice(3, 5);
        const day = this.form.value.date.slice(0, 2);
        if (isExists(+year, +month - 1, +day)) {
            const dateString = `${month}.${day}.${year}`;
            this.form.value.date = new Date(dateString);
            if (this.form.value.participants.length > 0) {
                this.form.value.participants = this.form.value.participants.split(
                    ','
                );
            } else {
                this.form.value.participants = [];
            }
            this.eventsService.addEvent(
                this.datePipe.transform(this.form.value.date, 'dd.MM.yyyy'),
                this.form.value
            );
            this.eventsService.changeEvent$.next('change');
            this.close();
        } else {
            alert('Неверная Дата!');
        }
    }

    deleteEvent() {
        if (typeof this.form.value.date === 'object') {
            this.form.value.date = this.datePipe.transform(
                this.form.value.date,
                'dd.MM.yyyy'
            );
        }
        this.eventsService.removeEvent(this.form.value.date);
        this.eventsService.changeEvent$.next('change');
        this.close();
    }

    setCoords() {
        let target = this.eventClick.target as HTMLElement;
        if (target.parentElement.classList[0] === 'day') {
            target = target.parentElement;
        }
        if (target.getBoundingClientRect().left < 600) {
            this.coords.x =
                target.getBoundingClientRect().left +
                pageXOffset +
                target.getBoundingClientRect().width +
                20;

            this.pointerCoords.x = -10;
            this.pointerHideCoords.x = 0;
        } else {
            this.coords.x =
                target.getBoundingClientRect().left +
                pageXOffset -
                this.self.firstElementChild.getBoundingClientRect().width -
                20;

            this.pointerCoords.x = 290;
            this.pointerHideCoords.x = this.pointerCoords.x - 10;
        }
        if (target.getBoundingClientRect().top + pageYOffset < 420) {
            this.coords.y =
                target.getBoundingClientRect().top + pageYOffset - 20;

            this.pointerCoords.y = 30;
            this.pointerHideCoords.y = 20;
        } else {
            this.coords.y =
                target.getBoundingClientRect().top +
                target.getBoundingClientRect().height +
                pageYOffset -
                this.self.firstElementChild.getBoundingClientRect().height;

            this.pointerCoords.y = 218;
            this.pointerHideCoords.y = 208;
        }
    }
}
