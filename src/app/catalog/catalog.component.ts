import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from './../item';
import { Router } from '@angular/router';
@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  items: Array<Item>;
  constructor(private http: HttpClient, public router: Router) { }

  ngOnInit(): void {
    this.http.get('assets/items.json').subscribe((data: any) => {
      this.items = data;
    });
  }

  itemSaving(item: Item): void {
    sessionStorage.setItem('currentItem', JSON.stringify(item));
    this.router.navigate(['/single-item']);
  }
}
