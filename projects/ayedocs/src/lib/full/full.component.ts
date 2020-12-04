import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import {
  AyedocsService,
  DocsApiComponentItem,
  DocsApiComponentRecordItems,
  DocsApiMenuItem,
  DocsApiArticle
} from '../ayedocs.service';

@Component({
  selector: 'ayedocs-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {
  @Input() path: undefined | string;
  @Input() service: undefined | AyedocsService;
  @Input() route: undefined | ActivatedRoute;

  // api
  recordParts: undefined | DocsApiComponentRecordItems;

  // active
  part: undefined | DocsApiComponentItem;
  menuItem: undefined | DocsApiMenuItem;
  article: undefined | DocsApiArticle;
  content: undefined | string;
  fragment: undefined | string;

  constructor(private router: Router) {}

  ngOnInit() {
    const recordPartsSubscription = this.service
      .getDocs()
      .subscribe(value => {
        this.recordParts = value;
        const {initial, redirect} = this.getInitialData();
        console.log('parts: ', this.recordParts);
        console.log('is initial: ', initial);
        console.log('is redirect: ', redirect);
        if (initial) {
          this.selectArticle(initial.partId, initial.menuItem);
        } else if (redirect) {
          // cancel subscription
          recordPartsSubscription.unsubscribe();
          // proccess paths
          const redirectPaths = [] as string[];
          redirectPaths.push(this.path || '/docs');
          if (redirect.partId) {
            redirectPaths.push(redirect.partId);
          }
          redirectPaths.push(redirect.itemId);
          // go to
          this.router.navigate(redirectPaths, {fragment: redirect.fragment});
        } else {
          this.getFrontpageContent()
            .then(content => this.content = content);
        }
      });
  }

  selectArticle(partId: string, menuItem: DocsApiMenuItem) {
    // must not be a category
    if (menuItem.articleId) {
      // current activated
      if (
        this.menuItem &&
        menuItem.articleId === this.menuItem.articleId
      ) {
        this.fragment = menuItem.fragment;
        this.contentReady();
      }
      // set active
      else {
        this.part = (this.recordParts || {})[partId];
        this.menuItem = menuItem;
        this.article = (this.part.recordArticles || {})[menuItem.articleId];
        this.fragment = menuItem.fragment;
        // process article
        if (this.article) {
          // get content
          if (!this.article.content) {
            this.service
              .getContent(this.article.src, this.part.contentModifier)
              .subscribe(content => this.content = content);
          } else {
            this.content = this.article.content;
          }
        }
      }
    }
  }

  contentReady() {
    console.log('content ready ...');
    if (this.fragment) {
      this.gotoFragment(this.fragment);
    }
  }

  private getInitialData() {
    let initial: undefined | {partId: string; menuItem: DocsApiMenuItem};
    let redirect: undefined | {partId?: string; itemId: string; fragment?: string};
    if (this.route) {
      let partId = this.route.snapshot.paramMap.get('partId');
      const itemId = this.route.snapshot.paramMap.get('itemId');
      const fragment = this.route.snapshot.fragment;
      let isSingle = false;
      // default part id
      if (!partId && itemId) {
        isSingle = true;
        partId = Object.keys(this.recordParts || {}).pop() as string;
      }
      // has initial
      if (partId && (this.recordParts || {})[partId]) {
        const recordMenu = this.recordParts[partId].recordMenu || {};
        const menuIds = Object.keys(recordMenu);
        const menuId = (itemId || '') + (fragment ? '#' + fragment : '');
        let menuItem = recordMenu[menuId];
        if (menuItem) {
          if (menuItem.articleId) {
            initial = {partId, menuItem};
          } else {
            // redirect to the first article of the category
            const nextMenuId = menuIds[menuIds.indexOf(menuId) + 1];
            const [itemId, fragment] = nextMenuId.split('#');
            redirect = {itemId, partId: isSingle ? '' : partId, fragment};
          }
        } else {
          // redirect to the first article of the part
          for (let i = 0; i < menuIds.length; i++) {
            const nextMenuId = menuIds[i];
            if (recordMenu[nextMenuId].articleId) {
              const [itemId, fragment] = nextMenuId.split('#');
              redirect = {itemId, partId: isSingle ? '' : partId, fragment};
              break;
            }
          }
        }
      } // else: no initial/redirect
    } // else: no initial/redirect
    // result
    return {initial, redirect};
  }

  private async getFrontpageContent() {
    return new Promise<string>(resolve => {
      const {frontpage: value} = this.service.getOptions();
      // first article
      if (value === 'first') {
        resolve('TODO: show the first article ...');
      }
      // content from a url
      else if ((value || '').startsWith('http')) {
        resolve('TODO: get content from url ...');
      }
      // article by id
      else if ((value || '').indexOf(':') !== -1) {
        resolve('TODO: show article by id ...');
      }
      // direct content
      else if (value && typeof value === 'string') {
        resolve(value);
      }
      // default
      else {
        resolve('TODO: show the default frontpage ...');
      }
    });
  }

  private gotoFragment(fragment: string) {
    console.log('scroll to #', fragment);
  }
}
