import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';
import { SingleItemComponent } from './single-item/single-item.component'

const routes: Routes = [
  { path: 'catalog-component', component:  CatalogComponent},
  { path: 'single-item', component:  SingleItemComponent},
  { path: '', redirectTo: '/catalog-component', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
