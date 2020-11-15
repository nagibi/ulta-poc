import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() icon: string;
  @Input() text: string;
  @Input() subtitle: string;
  @Input() bg: string;
  @Input() color: string;
  // @Input() actions: string;
  @Input() isCollapsed: boolean = false;
  @Input() isHeader:boolean = false;
  openText:string;
  closeText:string;
  constructor(protected translateService: TranslateService) {
    this.translateService.get(['MSG000181.descricao','MSG000033.descricao']).subscribe(messages=>{
      this.openText = messages['MSG000181.descricao'];
      this.closeText = messages['MSG000033.descricao'];
    });
  }

  ngOnInit() {

    if (this.text != null) {
      this.isHeader = true;

      this.translateService.get(this.text).subscribe((message) => {
        this.text = message;
      });
    }
    if (this.subtitle != null) {
      this.translateService.get(this.subtitle).subscribe((message) => {
        this.subtitle = message;
      });
    }
  }
}
