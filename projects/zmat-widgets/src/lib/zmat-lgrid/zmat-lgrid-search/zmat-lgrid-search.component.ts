import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

import { fromEvent } from 'rxjs';

@Component({
  selector: 'lib-zmat-lgrid-search',
  templateUrl: './zmat-lgrid-search.component.html',
  styleUrls: ['./zmat-lgrid-search.component.css']
})
export class ZmatLgridSearchComponent implements OnInit {

  @Output() searchChanged: EventEmitter<any> = new EventEmitter();

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  value = '';

  constructor() { }

  ngOnInit(): void {

    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.searchChanged.emit(text);
    });
  }

  clean(): void {
    this.value = '';
    this.searchChanged.emit(this.value);
  }
}
