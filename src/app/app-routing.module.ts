import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ayedocsRouteMatching } from '@lamnhan/ayedocs-angular';

import {HomeComponent} from './home/home.component';
import {SingleComponent} from './single/single.component';
import {MultipleComponent} from './multiple/multiple.component';

const routes: Routes = [
  {matcher: ayedocsRouteMatching('single'), component: SingleComponent},
  {matcher: ayedocsRouteMatching('multiple', true), component: MultipleComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
