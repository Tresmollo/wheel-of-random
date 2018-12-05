import { Injectable } from '@angular/core';
import { Config } from './config.model';
import { SlicesService } from './slices.service';

@Injectable()
export class ConfigService {
  config: Config = new Config(
    this.slicesService.slices,
    1,
    '#ffffff',
    true);

  constructor(private slicesService: SlicesService) {}

  setSlices(slices) {
    this.config.slices = slices;
  }

  setSliceLock(lock) {
    this.config.sliceLock = lock;
  }

  setSpinMulti(multi) {
    this.config.spinMulti = multi;
  }

  setBackgroundColor(color) {
    this.config.backgroundColor = color;
  }

  getFromLocalStorage() {
    console.log(sessionStorage.getItem('config'));
  }

  saveToLocalStorage() {
    sessionStorage.setItem('config', JSON.stringify(this.config));
  }

}
