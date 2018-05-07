import {animate, state, style, transition, trigger} from "@angular/animations";

export const MOVE_RIGHT_ANIMATION =
  trigger('MOVE_RIGHT', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
      style({
        opacity: 0,
        transform: 'translateX(+10%)'
      }),
      animate('0.7s ease-out')
    ]),
    transition('* => void', [
      animate('0.8s 0.8s ease-out', style({
        opacity: 1,
        transform: 'translateX(+50%)'
      }))
    ])
  ]);


