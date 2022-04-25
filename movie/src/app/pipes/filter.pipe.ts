import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items, search: string) {
    if (!search) {
      return items;
    }

    try {
      if (items.length !== 0) {
        return items.filter(
          (item) =>
            item &&
            item.title &&
            item.title.toLowerCase().indexOf(search.toLowerCase()) > -1
        );
      }
    } catch (error) {
      debugger;
    }

    return null;
  }
}
