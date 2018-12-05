import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  toggle: boolean;
  backgroundColor = '#ffffff';
  spinMulti = 1;

  onBackgroundUpdated(colorData) {
    this.backgroundColor = colorData;
  }

  onSpinMultiUpdated(spinData) {
    this.spinMulti = spinData;
  }

}
