import {
    Component,
    ViewChild,
    ComponentFactoryResolver,
    OnDestroy,
} from '@angular/core';
import { HostDirective } from 'src/app/directives-pipes/host.directive';
import { QuickAddEventComponent } from '../quick-add-event/quick-add-event.component';
import { SearchEventsPopupComponent } from '../search-events-popup/search-events-popup.component';
import { SearchEventService } from 'src/app/services/search-event.service';
import { debounceTime, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ContainerDirective } from 'src/app/directives-pipes/container.directive';

@Component({
    selector: 'app-search-panel',
    templateUrl: './search-panel.component.html',
    styleUrls: ['./search-panel.component.scss'],
})
export class SearchPanelComponent implements OnDestroy {
    @ViewChild(HostDirective, { static: true }) host: HostDirective;
    @ViewChild(ContainerDirective, { static: true })
    container: ContainerDirective;
    sub: Subscription;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private searchEventsService: SearchEventService
    ) {}

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    openEventEditor(e: Event) {
        this.host.viewContainerRef.clear();
        const resolver = this.componentFactoryResolver.resolveComponentFactory(
            QuickAddEventComponent
        );
        const componentRef = this.host.viewContainerRef.createComponent(
            resolver
        );
        componentRef.instance.parent = this;
        componentRef.instance.event = e;
    }

    closeEventEditor() {
        this.host.viewContainerRef.clear();
    }

    openSearchList(e: Event, events: any) {
        const resolver = this.componentFactoryResolver.resolveComponentFactory(
            SearchEventsPopupComponent
        );
        const el = this.container.viewContainerRef.createComponent(resolver);
        el.instance.inputEvent = e;
        el.instance.events = events;
        el.instance.parent = this;
    }

    closeSearchList() {
        this.container.viewContainerRef.clear();
    }

    searchEvents(e: Event, value: string) {
        this.searchEventsService.searchValue$.next(value);
        this.sub = this.searchEventsService.searchValue$
            .pipe(debounceTime(500))
            .subscribe((v: string) => {
                this.closeSearchList();
                if (v.length > 2) {
                    const events = this.searchEventsService.searchEvent(v);
                    if (events.length > 0) {
                        this.openSearchList(e, events);
                    } else {
                        this.closeSearchList();
                    }
                } else {
                    this.closeSearchList();
                }
            });
    }
}
