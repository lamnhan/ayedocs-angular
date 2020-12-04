import { UrlSegment, UrlMatchResult } from '@angular/router';

export function ayedocsRouteMatching(path: string, multiple = false) {
  return (segments: UrlSegment[]): UrlMatchResult => {
    if (segments.length > 0) {
      if (segments[0].path === path) {
        // get all params
        const params = [] as string[];
        segments.forEach((segment, i) => {
          if (i > 0) {
            params.push(segment.path);
          }
        });
        // result
        const partId = multiple ? params.shift() || '' : '';
        const itemId = params.join('/');
        return {
          consumed: segments,
          posParams: {
            partId: new UrlSegment(partId, {}),
            itemId: new UrlSegment(itemId, {})
          }
        };
      }
    }
    return null;
  };
}
