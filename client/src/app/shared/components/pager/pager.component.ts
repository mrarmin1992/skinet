import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
  @Input()
  totalCount!: number;
  @Input()
  pageSize!: number;
  @Output() pageChanged = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line: typedef
  onPagerChange(event: any){
    this.pageChanged.emit(event.page);
  }

}
