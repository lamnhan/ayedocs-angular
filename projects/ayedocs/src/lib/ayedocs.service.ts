import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type DocsApiTypes = 'file' | 'web';

export interface DocsApiMenuItem {
  title: string;
  level: number;
  type: DocsApiTypes;
  articleId?: string;
  anchor?: string;
}

export interface DocsApiArticle {
  title: string;
  src: string;
  type: DocsApiTypes;
  originalSrc?: string;
  content?: string;
}

export interface DocsApiResponse {
  originalUrl: string;
  menu: DocsApiMenuItem[];
  recordArticles: Record<string, DocsApiArticle>;
}

export interface DocsApiMember {
  id: string;
  title: string;
  url: string;
  logo?: string;
  image?: string;
}

export interface DocsApiLoadOptions {
  proxy?: string;
}

export interface DocsApiBuiltinFilter {
  onlyType?: DocsApiTypes;
}

export type DocsApiAdvancedFilter = (response: DocsApiResponse) => DocsApiResponse;

export type DocsApiModifier = (response: DocsApiResponse) => DocsApiResponse;

export type DocsApiComponentItem = DocsApiMember & Partial<DocsApiResponse>;

export interface DocsApiComponentInput {
  active?: string;
  recordItems?: Record<string, DocsApiComponentItem>;
}

@Injectable({
  providedIn: 'root'
})
export class AyedocsService {
  private options: DocsApiLoadOptions = {};
  private members: DocsApiMember[] = [];

  constructor() { }

  load(
    input: string | string[] | DocsApiMember[],
    options: DocsApiLoadOptions = {}
  ) {
    let members: DocsApiMember[] = [];
    if (typeof input === 'string') {
      const member = this.processStrInput(input);
      members = [member];
    } else if (typeof input[0] === 'string') {
      members = (input as string[]).map(ipt => this.processStrInput(ipt));
    } else {
      members = input as DocsApiMember[];
    }
    // logo, image
    members.forEach(member => {
      if (!member.logo) {
        member.logo = 'https://img.icons8.com/material-outlined/48/000000/document.png'
      }
      if (!member.image) {
        member.image = 'https://source.unsplash.com/UiiHVEyxtyA/480x360'
      }
    });
    // done
    this.options = options;
    this.members = members;
    return this;
  }

  getData(
    active?: string,
    filter?: DocsApiBuiltinFilter | DocsApiAdvancedFilter,
    modifier?: true | DocsApiModifier
  ) {
    const {
      proxy = 'https://cors-anywhere.herokuapp.com/'
    } = this.options;
    // build initial items
    const recordItems: Record<string, DocsApiComponentItem> = {};
    this.members.forEach(member => recordItems[member.id] = {...member});
    // return anytime data loaded
    const result: DocsApiComponentInput = {active, recordItems};
    return new Observable<DocsApiComponentInput>(observer =>
      this.members.forEach(member =>
        this.fetch(member.url, {}, proxy)
          .then(response => {
            const {
              originalUrl,
              menu,
              recordArticles
            } = this.processResponse(response, filter, modifier);
            // set data
            result.recordItems[member.id].originalUrl = originalUrl;
            result.recordItems[member.id].menu = menu;
            result.recordItems[member.id].recordArticles = recordArticles;
            // result
            observer.next(result);
          })
          .catch(() => observer.next(result))
      )
    );
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
      url = `https://${org}.github.io/${repo}/api/articles.json`;
    }
    return {id, title, url} as DocsApiMember;
  }

  private processResponse(
    response: DocsApiResponse,
    customFilter?: DocsApiBuiltinFilter | DocsApiAdvancedFilter,
    customModifier?: true | DocsApiModifier
  ) {
    // filterer
    let filterer: DocsApiAdvancedFilter;
    if (customFilter instanceof Function) {
      filterer = customFilter;
    } else if (customFilter) {
      filterer = this.getBuiltinFilterer();
    } else {
      filterer = (res: DocsApiResponse) => res;
    }
    // modifier
    let modifier: DocsApiModifier;
    if (customModifier instanceof Function) {
      modifier = customModifier;
    } else if (customModifier) {
      modifier = this.getBuiltinModifier();
    } else {
      modifier = (res: DocsApiResponse) => res;
    }
    // result
    return modifier(filterer(response));
  }

  private getBuiltinFilterer() {
    return ((response: DocsApiResponse) => {
      // TODO: add builtin filter
      return response;
    }) as DocsApiAdvancedFilter;
  }

  private getBuiltinModifier() {
    return ((response: DocsApiResponse) => {
      // TODO: add builtin modifier
      return response;
    }) as DocsApiModifier;
  }

  private async fetch(input: RequestInfo, init: RequestInit = {}, proxyUrl = '') {
    const response = await fetch(proxyUrl + input, {...init, method: 'get'});
    if (!response.ok) {
      throw new Error('Fetch failed!');
    }
    return response.json() as unknown as DocsApiResponse;
  }
}
