import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ImgService } from '../sevices/img-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line: no-input-rename
  @Input('active') activeBool: boolean;
  @ViewChild('link') currentLink;
  logoImagePath: string;
  constructor() { }

  ngOnInit(): void {
    this.logoImagePath = ImgService.LOGOTYPE_PATH;
  }
  // tslint:disable-next-line: typedef
  ngAfterViewInit() {
    if (this.activeBool) {
      this.currentLink.nativeElement.classList.add('active');
    }
  }
}
