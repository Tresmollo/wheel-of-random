import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { SlicesService } from './../slices.service';
import { ConfigService } from './../config.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  @Output() backgroundUpdated = new EventEmitter<string>();
  @Output() spinMultiUpdated = new EventEmitter<number>();
  backgroundColor = '#ffffff';
  spinMulti = 1;
  sliceLock = false;

  constructor(private slicesService: SlicesService,
    private configService: ConfigService) { }

  ngOnInit() {
  }

  onAddNewSlice() {
    this.slicesService.addSlice();
    this.slicesService.sliceUpdated.emit();
  }

  onBackgroundUpdate() {
    this.backgroundUpdated.emit(this.backgroundColor);
    this.configService.setBackgroundColor(this.backgroundColor);
  }

  onSpinMultiUpdate() {
    this.spinMultiUpdated.emit(this.spinMulti);
    this.configService.setSpinMulti(this.spinMulti);
  }

  onSliceLockUpdate() {
    this.configService.setSliceLock(this.sliceLock);
  }

  onSaveConfig() {
    this.configService.saveToLocalStorage();
  }

  onLoadConfig() {
    this.configService.getFromLocalStorage();
  }

}
