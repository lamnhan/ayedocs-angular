import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AyedocsModule, AyedocsService } from '@lamnhan/ayedocs-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SingleComponent } from './single/single.component';
import { MultipleComponent } from './multiple/multiple.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SingleComponent,
    MultipleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AyedocsModule,
  ],
  providers: [
    AyedocsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
