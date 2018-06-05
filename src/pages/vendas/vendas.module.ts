import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VendasPage } from './vendas';

@NgModule({
  declarations: [
    VendasPage,
  ],
  imports: [
    IonicPageModule.forChild(VendasPage),
  ],
})
export class VendasPageModule {}
