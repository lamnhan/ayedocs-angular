import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AyedocsService } from '@lamnhan/ayedocs-angular';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
  providers: [
    AyedocsService
  ],
  encapsulation: ViewEncapsulation.None,
})
export class SingleComponent implements OnInit {
  ayedocs: AyedocsService;

  constructor(
    private ayedocsService: AyedocsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ayedocs = this.ayedocsService.initialize('lamnhan/ayedocs', {path: 'single'});
  }
}
