import { NgScrollbar } from 'ngx-scrollbar';

export function scrollBackToTop(scrollable: NgScrollbar): void {
  scrollable.scrollTo({ top: 0 });
}
