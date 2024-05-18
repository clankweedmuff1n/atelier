import {trigger, style, animate, transition, keyframes, state} from '@angular/animations';

export const openCloseModal = trigger('openCloseModal', [
  state('show', style({
    opacity: 1,
    transform: 'scale(1)'
  })),
  state('hide', style({
    opacity: 0,
    transform: 'scale(0.7)'
  })),
  transition('hide => show', [
    animate('300ms', keyframes([
      style({
        opacity: 0,
        transform: 'scale(0.7)',
        offset: 0
      }),
      style({
        opacity: 1,
        transform: 'scale(0.95)',
        offset: 0.8
      }),
      style({
        opacity: 1,
        transform: 'scale(1)',
        offset: 1
      })
    ]))
  ]),
  transition('* => show', [
    animate('300ms', keyframes([
      style({
        opacity: 0,
        transform: 'scale(0.7)',
        offset: 0
      }),
      style({
        opacity: 1,
        transform: 'scale(0.95)',
        offset: 0.8
      }),
      style({
        opacity: 1,
        transform: 'scale(1)',
        offset: 1
      })
    ]))
  ]),
  transition('show => hide', [
    animate('300ms', keyframes([
      style({
        opacity: 1,
        transform: 'scale(1)',
        offset: 0
      }),
      style({
        opacity: 0,
        transform: 'scale(0.5)',
        offset: 1
      })
    ]))
  ]),
  transition('* => hide', [
    animate('300ms', keyframes([
      style({
        opacity: 1,
        transform: 'scale(1)',
        offset: 0
      }),
      style({
        opacity: 0,
        transform: 'scale(0.5)',
        offset: 1
      })
    ]))
  ])
]);

export const openCloseModalBackground = trigger('openCloseModalBackground', [
  state('show', style({
    opacity: 1,
  })),
  state('hide', style({
    opacity: 0,
  })),
  transition('hide => show', [
    animate('300ms', keyframes([
      style({
        opacity: 0.5,
      }),
      style({
        opacity: 0.7,
      }),
      style({
        opacity: 0.95,
      }),
      style({
        opacity: 1,
      })
    ]))
  ]),
  transition('* => show', [
    animate('300ms', keyframes([
      style({
        opacity: 0.5,
      }),
      style({
        opacity: 0.7,
      }),
      style({
        opacity: 0.95,
      }),
      style({
        opacity: 1,
      })
    ]))
  ]),
  transition('show => hide', [
    animate('300ms', keyframes([
      style({
        opacity: 1,
      }),
      style({
        opacity: 0.5,
      })
    ]))
  ]),
  transition('* => hide', [
    animate('300ms', keyframes([
      style({
        opacity: 1,
      }),
      style({
        opacity: 0.5,
      })
    ]))
  ])
]);

export const successIconAnimations = trigger('successIconAnimations', [
  transition(':enter', [
    animate('300ms', keyframes([
      style({
        top: '1.1875em',
        left: '0.0625em',
        width: 0,
        offset: 0
      }),
      style({
        top: '1.0625em',
        left: '0.125em',
        width: 0,
        offset: 0.54
      }),
      style({
        top: '2.1875em',
        left: '-0.375em',
        width: '3.125em',
        offset: 0.7
      }),
      style({
        top: '3em',
        left: '1.3125em',
        width: '1.0625em',
        offset: 0.84
      }),
      style({
        top: '2.8125em',
        left: '0.8125em',
        width: '1.5625em',
        offset: 1
      })
    ]))
  ])
]);

export const successLineLongAnimations = trigger('successLineLongAnimations', [
  transition(':enter', [
    animate('300ms', keyframes([
      style({
        top: '3.375em',
        right: '2.875em',
        width: 0,
        offset: 0
      }),
      style({
        top: '3.375em',
        right: '2.875em',
        width: 0,
        offset: 0.65
      }),
      style({
        top: '2.1875em',
        right: 0,
        width: '3.4375em',
        offset: 0.84
      }),
      style({
        top: '2.375em',
        right: '0.5em',
        width: '2.9375em',
        offset: 1
      })
    ]))
  ])
]);

export const errorIconAnimations = trigger('errorIconAnimations', [
  transition(':enter', [
    animate('300ms', keyframes([
      style({
        marginTop: '1.625em',
        transform: 'scale(0.4)',
        opacity: 0,
        offset: 0
      }),
      style({
        marginTop: '1.625em',
        transform: 'scale(0.4)',
        opacity: 0,
        offset: 0.5
      }),
      style({
        marginTop: '-0.375em',
        transform: 'scale(1.15)',
        offset: 0.8
      }),
      style({
        marginTop: 0,
        transform: 'scale(1)',
        opacity: 1,
        offset: 1
      })
    ]))
  ])
]);

export const errorIconCrossAnimations = trigger('errorIconCrossAnimations', [
  transition(':enter', [
    animate('300ms', keyframes([
      style({
        transform: 'rotateX(100deg)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'rotateX(0deg)',
        opacity: 1,
        offset: 1
      })
    ]))
  ])
]);

export const loadingIconAnimations = trigger('loadingIconAnimations', [
  transition(':enter', [
    animate('1000ms', keyframes([
      style({
        transform: 'rotate(0deg)',
        offset: 0
      }),
      style({
        transform: 'rotate(360deg)',
        offset: 1
      })
    ]))
  ])
]);

export const questionMarkAnimations = trigger('questionMarkAnimations', [
  transition(':enter', [
    animate('300ms', keyframes([
      style({
        transform: 'rotateY(-360deg)',
        offset: 0
      }),
      style({
        transform: 'rotateY(0)',
        offset: 1
      })
    ]))
  ])
]);

export const infoWarningMarkAnimations = trigger('infoWarningMarkAnimations', [
  transition(':enter', [
    animate('300ms', keyframes([
      style({
        transform: 'rotateZ(45deg)',
        opacity: 0,
        offset: 0
      }),
      style({
        transform: 'rotateZ(-25deg)',
        opacity: 0.4,
        offset: 0.25
      }),
      style({
        transform: 'rotateZ(15deg)',
        opacity: 0.8,
        offset: 0.5
      }),
      style({
        transform: 'rotateZ(-5deg)',
        opacity: 1,
        offset: 0.75
      }),
      style({
        transform: 'rotateX(0)',
        opacity: 1,
        offset: 1
      })
    ]))
  ])
]);
