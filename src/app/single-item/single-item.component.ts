import { Component, OnInit, Renderer2 } from '@angular/core';
import { withLatestFrom } from 'rxjs/operators';
import { Item } from './../item';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-single-item',
  templateUrl: './single-item.component.html',
  styleUrls: ['./single-item.component.scss']
})
export class SingleItemComponent implements OnInit {
  faChevronRight = faChevronRight;
  item: Item;
  images = [];
  imagesBasic = [
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg', thumb:
    'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(117).jpg', description: 'Image 1' },
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg', thumb:
    'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(98).jpg', description: 'Image 2' },
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg', thumb:
    'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(131).jpg', description: 'Image 3' },
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg', thumb:
    'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(123).jpg', description: 'Image 4' },
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg', thumb:
    'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(118).jpg', description: 'Image 5' },
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg', thumb:
    'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(128).jpg', description: 'Image 6' },
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg', thumb:
    'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(132).jpg', description: 'Image 7' },
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg', thumb:
    'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(115).jpg', description: 'Image 8' },
    { img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg', thumb:
    'https://mdbootstrap.com/img/Photos/Horizontal/Nature/12-col/img%20(133).jpg', description: 'Image 9' }
    ];

  cards = [];

  slides: any = [[]];

  constructor(private http: HttpClient, private renderer: Renderer2) { }

  chunk(arr: any, chunkSize: number) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  ngOnInit(): void {
    this.item = JSON.parse(sessionStorage.getItem('currentItem'));
    const imagesName = this.transform(this.item.sourceImage, this.item.thumbImages);
    imagesName.forEach((imagesObj, i) => {
      this.http.get('assets/images/items/' + imagesObj.sourceImage, { responseType: 'blob' })
        .pipe(withLatestFrom(this.http.get('assets/images/items/' + imagesObj.thumbImage, { responseType: 'blob' }))).subscribe((data) => {
          this.filetoBase64(data[0]).then((source) => {
            this.filetoBase64(data[1]).then((thumb) => {
              this.images.push({ sourceImage: source, thumbImage: thumb });
              this.cards.push({ img: String(source) });
              if ((i + 1) === imagesName.length) {
                this.slides = this.chunk(this.cards, 3);
              }
            });
          });
        });
    });
  }

  transform(arr1, arr2): Array<any> {
    const arr = [];
    arr1.forEach((elt, i) => {
      arr.push({ sourceImage: elt, thumbImage: arr2[i] });
    });
    return arr;
  }

  private filetoBase64(file: Blob): Promise<string | ArrayBuffer> {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
    });
  }

  ngAfterViewInit() {
    const buttons = document.querySelectorAll('.btn-floating');
    buttons.forEach((el: any) => {
      this.renderer.removeClass(el, 'btn-floating');
      this.renderer.addClass(el, 'px-3');
      this.renderer.addClass(el.firstElementChild, 'fa-3x');
    });
  }

}
