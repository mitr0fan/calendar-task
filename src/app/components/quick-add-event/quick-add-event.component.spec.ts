import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickAddEventComponent } from './quick-add-event.component';

describe('QuickAddEventComponent', () => {
    let component: QuickAddEventComponent;
    let fixture: ComponentFixture<QuickAddEventComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QuickAddEventComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuickAddEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
