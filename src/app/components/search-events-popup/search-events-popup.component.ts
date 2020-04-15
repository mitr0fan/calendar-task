import { Component, OnInit, OnDestroy } from '@angular/core';
import { Event } from 'src/app/types/event';
import { SearchEventService } from 'src/app/services/search-event.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-events-popup',
  templateUrl: './search-events-popup.component.html',
  styleUrls: ['./search-events-popup.component.scss']
})
export class SearchEventsPopupComponent implements OnInit, OnDestroy {
  events: Event[];
  sub: Subscription;

  constructor(private searchEvents: SearchEventService) { }

  ngOnInit() {
    this.sub = this.searchEvents.searchValue$
    .subscribe(v => console.log(v));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
