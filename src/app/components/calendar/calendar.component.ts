import {
    Component,
    OnInit,
    ViewChild,
    ComponentFactoryResolver,
    ComponentFactory,
    ComponentRef,
    OnDestroy,
} from '@angular/core';
import { CreateCalendarService } from 'src/app/services/create-calendar.service';
import { CONSTANTS } from 'src/app/constants/constants';
import { HostDirective } from 'src/app/directives-pipes/host.directive';
import { AddEventComponent } from '../add-event/add-event.component';
import { EventsService } from 'src/app/services/events.service';
import { EventsStore } from 'src/app/types/events-store';
import { DatePipe } from '@angular/common';
import { Event as EventInterface } from 'src/app/types/event';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit, OnDestroy {
    dates: Date[];
    events: EventsStore;
    currentDate: string;
    selectedDay: Date;
    @ViewChild(HostDirective, { static: true }) host: HostDirective;
    sub: Subscription;

    constructor(
        private createCalendar: CreateCalendarService,
        private resolver: ComponentFactoryResolver,
        private eventsService: EventsService,
        public datePipe: DatePipe,
        private ls: LocalStorageService
    ) {}

    ngOnInit() {
        this.dates = this.createCalendar.createMonth(new Date());
        this.changeCurrentDate();
        const sub1 = this.eventsService.changeEvent$.subscribe(() => {
            this.events = { ...this.eventsService.getEvents() };
        });
        const sub2 = this.createCalendar.changeMonth$.subscribe((dates) => {
            this.dates = this.createCalendar.createMonth(dates);
            this.changeCurrentDate();
        });
        this.sub.add(sub1);
        this.sub.add(sub2);
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    changeCurrentDate() {
        this.currentDate = `${
            CONSTANTS.MONTHS[this.dates[10].getMonth()]
        } ${this.dates[10].getFullYear()}`;
    }

    previousMonth() {
        this.dates = this.createCalendar.previousMonth(this.dates[10]);
        this.changeCurrentDate();
    }

    nextMonth() {
        this.dates = this.createCalendar.nextMonth(this.dates[10]);
        this.changeCurrentDate();
    }

    today() {
        this.dates = this.createCalendar.createMonth(new Date());
        this.changeCurrentDate();
    }

    openAddEventPopup(e: Event, day: Date, dayEvent?: EventInterface) {
        this.host.viewContainerRef.clear();
        const factory: ComponentFactory<AddEventComponent> = this.resolver.resolveComponentFactory(
            AddEventComponent
        );
        const child: ComponentRef<AddEventComponent> = this.host.viewContainerRef.createComponent(
            factory
        );

        child.instance.parent = this;
        child.instance.eventClick = e;
        child.instance.self = child.location.nativeElement;
        child.instance.day = day;
        if (dayEvent) {
            child.instance.event = dayEvent;
        }
    }

    closeAddEventPopup() {
        this.host.viewContainerRef.clear();
    }
}
