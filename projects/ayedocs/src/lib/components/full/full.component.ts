import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AyedocsService } from '../../services/ayedocs/ayedocs.service';

@Component({
  selector: 'ayedocs-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FullComponent implements OnInit {
  @Input() service: undefined | AyedocsService;
  @Input() route: undefined | ActivatedRoute;

  constructor() {}

  ngOnInit(): void {}
}
