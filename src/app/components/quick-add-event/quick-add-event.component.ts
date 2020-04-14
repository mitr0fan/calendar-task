import { Component, OnInit } from '@angular/core';
import { SearchPanelComponent } from '../search-panel/search-panel.component';

@Component({
  selector: 'app-quick-add-event',
  templateUrl: './quick-add-event.component.html',
  styleUrls: ['./quick-add-event.component.scss']
})
export class QuickAddEventComponent implements OnInit {
  parent: SearchPanelComponent;
  event: Event;
  coords: {x: number, y: number};

  constructor() { }

  ngOnInit() {
    const target: HTMLButtonElement = this.event.target as HTMLButtonElement;
    this.coords = {
      x: target.getBoundingClientRect().left
        + pageXOffset,

      y: target.getBoundingClientRect().top
        + pageYOffset
        + target.getBoundingClientRect().height
        + 15,
    };
  }

  close() {
    this.parent.closeEventEditor();
  }

}
