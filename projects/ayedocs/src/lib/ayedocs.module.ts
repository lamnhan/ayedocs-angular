import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullComponent } from './full/full.component';
import { O2aPipe } from './o2a/o2a.pipe';

@NgModule({
  declarations: [FullComponent, O2aPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    FullComponent,
    O2aPipe,
  ]
})
export class AyedocsModule { }
