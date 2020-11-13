import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'o2a'
})
export class O2aPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown[] {
    const [
      clone = false,
      includeKey = true,
      limit = 0,
      honorable = false
    ] = args;
    // proccess
    const obj = (!clone ? value : {...(value as Record<string, unknown>)}) as Record<string, unknown>;
    // process
    const arr = [];
    for (const key of Object.keys(obj)) {
      if (typeof obj[key] === 'object') {
        obj[key]['$key'] = key;
      } else {
        obj[key] = {
          $key: key,
          value: obj[key]
        };
      }
      if (!includeKey) {
        delete obj[key]['$key'];
      }
      arr.push(obj[key]);
    }
    // limit
    if (limit) {
      arr.splice(limit as number, arr.length);
    }
    // result
    return honorable && arr.length < 1 ? null : arr;
  }

}
