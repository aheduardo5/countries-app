import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subject, debounceTime, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [],
})
export class SearchBoxComponent {
  private debouncer: Subject<string> = new Subject<string>();
  private debouncerSuscription?: Subscription;  
  @Input()
  public placeholder: string = '';
  @Input()
  public initialValue?: string;
  @Output()
  public onValue: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public onDebounce: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {
    this.debouncerSuscription = this.debouncer
      .pipe(debounceTime(500))
      .subscribe((value) => this.onDebounce.emit(value));
  }

  ngOnDestroy(){
   this.debouncerSuscription?.unsubscribe();
  }
  txtInput(value: string): void {
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm: string) {
    this.debouncer.next(searchTerm);
  }
}
