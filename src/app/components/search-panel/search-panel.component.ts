import { Component, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { HostDirective } from 'src/app/directives-pipes/host.directive';
import { QuickAddEventComponent } from '../quick-add-event/quick-add-event.component';
import { SearchEventsPopupComponent } from '../search-events-popup/search-events-popup.component';
import { SearchEventService } from 'src/app/services/search-event.service';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent {

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private searchEventsService: SearchEventService
  ) { }

  @ViewChild(HostDirective, {static: true}) host: HostDirective;

  openEventEditor(e: Event) {
    this.host.viewContainerRef.clear();
    const resolver = this.componentFactoryResolver.resolveComponentFactory(QuickAddEventComponent);
    const componentRef = this.host.viewContainerRef.createComponent(resolver);
    componentRef.instance.parent = this;
    componentRef.instance.event = e;
  }

  closeEventEditor() {
    this.host.viewContainerRef.clear();
  }

  openSearchList() {
    const resolver = this.componentFactoryResolver.resolveComponentFactory(SearchEventsPopupComponent);
    const searchElem = this.host.viewContainerRef.createComponent(resolver);
  }

  closeSearchList() {
    this.host.viewContainerRef.clear();
  }

  searchEvents(value: string) {
    this.searchEventsService.searchValue$.next(value);
  }

}
