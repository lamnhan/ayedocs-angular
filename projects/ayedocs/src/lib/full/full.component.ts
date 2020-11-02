import { Component, Input } from '@angular/core';

import {AyedocsService} from '../ayedocs.service';

@Component({
  selector: 'ayedocs-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {

  @Input() service: AyedocsService;

  constructor() { }

}
