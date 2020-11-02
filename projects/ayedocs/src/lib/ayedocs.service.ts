import { Injectable } from '@angular/core';
import { from } from 'rxjs';

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
  url: string;
  menu: DocsApiMenuItem[];
  recordArticles: Record<string, DocsApiArticle>;
}

export interface DocsApiMember {
  title: string;
  id: string;
  logo?: string;
}

export interface Options {
  onlyType?: DocsApiTypes;
}

@Injectable({
  providedIn: 'root'
})
export class AyedocsService {
  private input: string | DocsApiMember[] = [];
  private options: Options = {};

  constructor() { }

  initialize(input: string | DocsApiMember[], options: Options = {}) {
    this.input = input;
    this.options = options;
    return this;
  }

  private async fetch(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, {...init, method: 'GET'});
    if (!response.ok) {
      throw new Error('Fetch failed!');
    }
    return response.json() as unknown as DocsApiResponse;
  }
}
