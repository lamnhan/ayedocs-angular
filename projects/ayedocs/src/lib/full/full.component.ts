import { Component, Input } from '@angular/core';

import {DocsApiComponentInput} from '../ayedocs.service';

@Component({
  selector: 'ayedocs-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent {
  @Input() data: undefined | DocsApiComponentInput;

  constructor() { }
}
