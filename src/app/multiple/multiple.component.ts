import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AyedocsService } from '@lamnhan/ayedocs-angular';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
  providers: [
    AyedocsService
  ]
})
export class MultipleComponent  implements OnInit {
  ayedocs: AyedocsService;

  constructor(
    private ayedocsService: AyedocsService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.ayedocs = this.ayedocsService
      .initialize(
        [
          'lamnhan/seminjecto',
          'lamnhan/ayedocs',
        ],
        {
          path: 'multiple'
        },
      );
  }
}
