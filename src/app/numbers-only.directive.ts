import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const input = this.el.nativeElement as HTMLInputElement;
    const value = input.value;
    const regex = /^\d*$/; // Regular expression to allow only digits (numbers)

    if (!regex.test(value)) {
      // If the input contains non-numeric characters, remove them
      input.value = value.replace(/\D/g, '');
    }
  }
}
