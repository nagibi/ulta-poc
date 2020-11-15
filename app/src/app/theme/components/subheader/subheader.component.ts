import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventEmitter } from 'events';
import { Button, ButtonType } from 'src/app/core/models/button.model';
import { SubheaderService } from '../../services/subheader.service';
import { Label } from '../../models/label.model';

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css'],
})
export class SubheaderComponent implements OnInit {
  subscription: Subscription;
  todos: Subscription;
  buttons: Button[] = [];
  title: string;
  text: string;
  @Input() label: Label;
  @Output() respostaLabel = new EventEmitter();

  constructor(private subheaderService: SubheaderService) {

  }

  ngOnInit() {

    this.subscription = this.subheaderService
      .getSubheader()
      .subscribe((subheader) => {
        this.title = subheader.title;
        this.text = subheader.text;
        this.label = subheader.label;
        this.buttons = subheader.buttons;
      });

      this.subscription = this.subheaderService
      .getTitle()
      .subscribe((value) => {
        this.title = value;
      });

      this.subscription = this.subheaderService
      .getText()
      .subscribe((value) => {
        this.text = value
      });
  }
}
