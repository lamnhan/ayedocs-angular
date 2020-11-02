import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HomeComponent} from './home/home.component';
import {SingleComponent} from './single/single.component';
import {MultipleComponent} from './multiple/multiple.component';

const routes: Routes = [
  {path: 'single', component: SingleComponent},
  {path: 'multiple', component: MultipleComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
