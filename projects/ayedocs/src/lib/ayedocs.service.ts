import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

export type DocsApiTypes = 'file' | 'web';

export interface DocsApiMenuItem {
  title: string;
  level: number;
  type: DocsApiTypes;
  slug: string;
  ext: string;
  fragment?: string;
  articleId?: string;
}

export interface DocsApiArticle {
  title: string;
  src: string;
  type: DocsApiTypes;
  ext: string;
  slug: string;
  originalSrc?: string;
  content?: string;
}

export interface DocsApiResponse {
  docsUrl: string;
  recordMenu: Record<string, DocsApiMenuItem>;
  recordArticles: Record<string, DocsApiArticle>;
}

export interface DocsApiMember {
  id: string;
  title: string;
  url: string;
  logo?: string;
  image?: string;
  docsModifier?: true | DocsApiBuiltinModification | DocsApiDocsModifier;
  contentModifier?: true | DocsApiContentModifier;
}

export interface DocsApiOptions {
  frontpage?: 'first' | string;
}

export interface DocsApiBuiltinModification {
  onlyType?: DocsApiTypes;
  noExt?: true;
}

export type DocsApiDocsModifier = (response: DocsApiResponse) => DocsApiResponse;

export type DocsApiContentModifier = (content: string, url: string) => string;

export type DocsApiComponentItem = DocsApiMember & Partial<DocsApiResponse>;

export type DocsApiComponentRecordItems = Record<string, DocsApiComponentItem>;

@Injectable({
  providedIn: 'root'
})
export class AyedocsService {
  private options: DocsApiOptions = {};
  private recordMembers: Record<string, DocsApiMember> = {};
  private recordParts: Record<string, DocsApiComponentItem> = {};

  constructor() {}

  getOptions() {
    return this.options;
  }

  private async httpFetch(url: string, isJson = true) {
    const response = await fetch(url, {method: 'get'});
    if (!response.ok) {
      throw new Error('Fetch failed!');
    }
    return isJson
      ? response.json()
      : response.text();
  }

  private async fetchDocs(
    url: string,
    modifier?: true | DocsApiBuiltinModification | DocsApiDocsModifier
  ) {
    // fetch data
    const response = await this.httpFetch(url) as unknown as DocsApiResponse;
    // modifier
    if (modifier && !(modifier instanceof Function)) {
      modifier = this.getBuiltinModifier();
    } else if (modifier === true) {
      modifier = this.getDefaultDocsModifier();
    }
    // result
    return modifier instanceof Function
      ? modifier(response)
      : response;
  }

  private async fetchContent(
    url: string,
    modifier?: true | DocsApiContentModifier
  ) {
    // fetch content
    const content = await this.httpFetch(url, false) as string;
    // modifier
    if (modifier === true) {
      modifier = this.getDefaultContentModifier();
    }
    // result
    return modifier instanceof Function
      ? modifier(content, url)
      : content;
  }

  initialize(
    input: string | string[] | DocsApiMember[],
    options: DocsApiOptions = {}
  ) {
    const recordMembers: Record<string, DocsApiMember> = {};
    if (typeof input === 'string') {
      const member = this.processStrInput(input);
      recordMembers[member.id] = member;
    } else if (typeof input[0] === 'string') {
      (input as string[]).forEach(ipt => {
        const member = this.processStrInput(ipt);
        recordMembers[member.id] = member;
      });
    } else {
      const members = input as DocsApiMember[];
      members.forEach(member => recordMembers[member.id] = member);
    }
    // logo, image
    for (const id of Object.keys(recordMembers)) {
      recordMembers[id].logo =
        recordMembers[id].logo ||
        'https://img.icons8.com/material-outlined/48/000000/document.png';
      recordMembers[id].image =
        recordMembers[id].image ||
        'https://source.unsplash.com/UiiHVEyxtyA/480x360';
    }
    // set values
    this.options = options;
    this.recordMembers = recordMembers;
    // return the service
    return this;
  }

  getDocs() {
    return new Observable<DocsApiComponentRecordItems>(observer => {
      if (Object.keys(this.recordParts).length !== 0) {
        observer.next(this.recordParts);
      } else {
        const memberIds = [] as string[];
        const docsGetters = [] as Array<Promise<DocsApiResponse>>;
        for (const id of Object.keys(this.recordMembers)) {
          const member = this.recordMembers[id];
          // init & save ids
          memberIds.push(id);
          this.recordParts[id] = {...member};
          // save getters
          docsGetters.push(this.fetchDocs(member.url, member.docsModifier));
        }
        // load data
        Promise.all(docsGetters)
          .then(result => {
            result.forEach((response, i) => {
              this.recordParts[memberIds[i]].docsUrl = response.docsUrl;
              this.recordParts[memberIds[i]].recordMenu = response.recordMenu;
              this.recordParts[memberIds[i]].recordArticles = response.recordArticles;
            });
            observer.next(this.recordParts);
          });
      }
    });
  }

  getContent(url: string, modifier?: true | DocsApiContentModifier) {
    return from(this.fetchContent(url, modifier));
  }

  private getBuiltinModifier() {
    return ((response: DocsApiResponse) => {
      // TODO: add filter modifier
      return response;
    }) as DocsApiDocsModifier;
  }

  private getDefaultDocsModifier() {
    return ((response: DocsApiResponse) => {
      // TODO: add builtin modifier
      return response;
    }) as DocsApiDocsModifier;
  }

  private getDefaultContentModifier() {
    return ((content: string, url: string) => {
      // TODO: add content modifier
      return content;
    }) as DocsApiContentModifier;
  }
 
  private processStrInput(input: string) {
    let id: string;
    let title: string;
    let url: string;
    if (input.indexOf('.json') !== -1) {
      const [v1, v2] = input
        .replace(/(http\:\/\/)|(https\:\/\/)/, '')
        .split('/')
        .map(v => v.replace(/\./g, '-'));
      id = `${v1}_${v2}`;
      title = `@${v1}/${v2}`;
      url = input;
    } else {
      const [org, repo] = input.replace('@', '').replace(/ /g, '').split('/');
      id = `${org}_${repo}`;
      title = `@${org}/${repo}`;
      url = `https://raw.githubusercontent.com/${org}/${repo}/master/docs/api/articles.json`;
    }
    return {id, title, url} as DocsApiMember;
  }
}
