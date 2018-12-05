import { Component, OnInit, Input } from '@angular/core';
import { Slice } from '../slice/slice.model';
import { SlicesService } from './../../slices.service';

@Component({
  selector: 'app-slice-edit',
  templateUrl: './slice-edit.component.html',
  styleUrls: ['./slice-edit.component.css'],
  providers: []
})
export class SliceEditComponent implements OnInit {
  @Input() slice: Slice;

  constructor(private slicesService: SlicesService) { }

  ngOnInit() {
  }

  onSliceDelete() {
    if (this.slicesService.slices.length < 2) {
      console.log('only one slice left, cant delete');
      return;
    }
    this.slicesService.deleteSlice(this.slice);
    this.slicesService.sliceUpdated.emit();
  }

  onSliceUpdate() {
    this.slicesService.sliceUpdated.emit();
  }

}
