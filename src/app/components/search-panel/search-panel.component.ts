import { Component, ViewChild, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { HostDirective } from 'src/app/directives-pipes/host.directive';
import { QuickAddEventComponent } from '../quick-add-event/quick-add-event.component';

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.scss']
})
export class SearchPanelComponent {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

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

}
