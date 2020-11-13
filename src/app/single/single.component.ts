import { Component, OnInit } from '@angular/core';

import { AyedocsService, DocsApiComponentInput } from '@lamnhan/ayedocs-angular';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {
  ayedocsData: undefined | DocsApiComponentInput;

  constructor(private ayedocsService: AyedocsService) { }

  ngOnInit(): void {
    this.ayedocsService
      .load('lamnhan/ayedocs')
      .getData()
      .subscribe(data => this.ayedocsData = data);
  }
}
