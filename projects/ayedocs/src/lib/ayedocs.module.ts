import { NgModule, SecurityContext } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule, MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown';
import 'prismjs';
import 'prismjs/components/prism-css.min.js';
import 'prismjs/components/prism-scss.min.js';
import 'prismjs/components/prism-javascript.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-markdown.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min.js';

import { FullComponent } from './full/full.component';
import { O2aPipe } from './o2a/o2a.pipe';

@NgModule({
  declarations: [FullComponent, O2aPipe],
  imports: [
    CommonModule,
    MarkdownModule,
  ],
  providers: [
    MarkdownService,
    {
      provide: SECURITY_CONTEXT,
      useValue: SecurityContext.HTML
    }
  ],
  exports: [
    FullComponent,
    O2aPipe,
  ]
})
export class AyedocsModule { }
