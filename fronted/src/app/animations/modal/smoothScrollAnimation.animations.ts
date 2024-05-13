import { animate, animation, style } from '@angular/animations';

export const smoothScrollAnimation = animation([
  style({ scrollTop: '{{ start }}px' }),
  animate('{{ time }}', style({ scrollTop: '{{ end }}px' })),
], { params: { start: 0, end: 0, time: '500ms' } });
