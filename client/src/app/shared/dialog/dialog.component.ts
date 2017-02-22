
import {
  animate,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  trigger,
  style,
  transition } from '@angular/core';

@Component({
  selector: 'c2s-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class DialogComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
  }
}
