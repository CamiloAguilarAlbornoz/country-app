import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

  private debouncer: Subject<string>;
  private debouncerSuscription?: Subscription;

  @Input()
  public placeholder: string = '';

  @Input()
  public initValue: string = '';

  @ViewChild('txtInput')
  public inputRef!: ElementRef<HTMLInputElement>;

  @Output()
  public onValue: EventEmitter<string>;

  @Output()
  public onDebounce: EventEmitter<string>;

  constructor() {
    this.onValue = new EventEmitter<string>();
    this.debouncer = new Subject<string>();
    this.onDebounce = new EventEmitter<string>();
  }
  ngOnDestroy(): void {
    this.debouncerSuscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.debouncerSuscription = this.debouncer
      .pipe(
        debounceTime(300)
      )
      .subscribe((debouncerValue) => {
        this.onDebounce.emit(debouncerValue);
      }
    )
  }

  public saveText(): void {
    this.onValue.emit(this.inputRef.nativeElement.value);
  }

  public onKeyPress() : void {
    const searchTerm: string = this.inputRef.nativeElement.value;
    this.debouncer.next(searchTerm);
  }
}
