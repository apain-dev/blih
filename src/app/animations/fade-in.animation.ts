import {animate, state, style, transition, trigger} from "@angular/animations";

export const FADE_IN_ANNIMATION =
  trigger('FADE_IN', [
  state('in', style({opacity: 1, transform: 'translateX(0)'})),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translateX(-1.7%)'
    }),
    animate('0.6s ease-in')
  ]),
  transition('* => void', [
    animate('0.5s 0.5s ease-out', style({
      opacity: 0,
      transform: 'translateX(+2%)'
    }))
  ])
]);


