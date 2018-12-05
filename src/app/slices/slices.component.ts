import { Component, OnInit } from '@angular/core';

import { SlicesService } from './../slices.service';
import { Slice } from './slice/slice.model';
import { SliceEditComponent } from './slice-edit/slice-edit.component';

@Component({
  selector: 'app-slices',
  templateUrl: './slices.component.html',
  styleUrls: ['./slices.component.css'],
  providers: []
})
export class SlicesComponent implements OnInit {
  slices: Slice[] = [];

  constructor(private slicesService: SlicesService) { }

  ngOnInit() {
    this.slices = this.slicesService.slices;
  }

}
