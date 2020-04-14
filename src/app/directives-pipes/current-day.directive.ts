import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appCurrentDay]'
})
export class CurrentDayDirective implements OnInit {
  @Input('appCurrentDay') day: Date;
  private now = new Date();
  private currentDay = this.now.getDate();
  private currentMonth = this.now.getMonth();
  private currentYear = this.now.getFullYear();

  constructor(private elem: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (
      this.currentYear === this.day.getFullYear()
      && this.currentMonth === this.day.getMonth()
      && this.currentDay === this.day.getDate()
    ) {
      this.renderer.setStyle(
        this.elem.nativeElement,
        'background',
        'rgb(233, 233, 233)'
      );
    }
  }

}
