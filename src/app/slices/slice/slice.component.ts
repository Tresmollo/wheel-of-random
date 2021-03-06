import { Component, OnInit, Input } from '@angular/core';
import { Slice } from './slice.model';

@Component({
  selector: 'app-slice',
  templateUrl: './slice.component.html',
  styleUrls: ['./slice.component.css']
})
export class SliceComponent implements OnInit {
  @Input() slice: Slice;

  constructor() { }

  ngOnInit() {
  }

}
