import { Component, OnInit } from '@angular/core';

import { AyedocsService } from '@lamnhan/ayedocs-angular';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss']
})
export class SingleComponent implements OnInit {

  private ayedocs: undefined | AyedocsService;

  constructor(private ayedocsService: AyedocsService) { }

  ngOnInit(): void {
  }

}
