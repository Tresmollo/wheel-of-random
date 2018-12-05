import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { WheelComponent } from './wheel/wheel.component';
import { SlicesComponent } from './slices/slices.component';
import { SliceComponent } from './slices/slice/slice.component';
import { SliceEditComponent } from './slices/slice-edit/slice-edit.component';
import { SlicesService } from './slices.service';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    WheelComponent,
    SlicesComponent,
    SliceComponent,
    SliceEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFontAwesomeModule,
  ],
  providers: [SlicesService, ConfigService],
  bootstrap: [AppComponent]
})
export class AppModule { }
