import { Component, OnInit, Input } from '@angular/core';
import { Item } from './../../item';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {

  // tslint:disable-next-line: no-input-rename
  @Input('item') item: Item;
  genImage: string;
  productName: string;
  productPrice: string;
  availability = true;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.productPrice = this.item.price + ' EUR';
    this.productName = this.item.name;
    if(this.item.quantity > 0) {
      this.availability = false;
    }
    this.http.get('assets/images/items/' + this.item.generalImage, { responseType: 'blob' }).subscribe((data: Blob) => {
      const base64 = this.filetoBase64(data).then((base64: string) => {
      this.genImage = base64;
      });
    });
  }

  private filetoBase64(file: Blob): Promise<string | ArrayBuffer> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
    });
  }

}
