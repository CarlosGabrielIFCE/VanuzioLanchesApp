import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule , LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FornecedorPage } from '../pages/fornecedor/fornecedor';
import { ProductPage } from '../pages/product/product';
import { VendasPage } from '../pages/vendas/vendas';
import { ClientPage } from '../pages/client/client';
import { LoginPage } from '../pages/login/login';

import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { FornecedorProvider } from '../providers/fornecedor/fornecedor';
import { CategoriesProvider } from '../providers/categories/categories';
import { ProductProvider } from '../providers/product/product';
import { VendaProvider } from '../providers/venda/venda';
import { ClientProvider } from '../providers/client/client';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FornecedorPage,
    ProductPage,
    VendasPage,
    ClientPage,
    LoginPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FornecedorPage,
    ProductPage,
    VendasPage,
    ClientPage,
    LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: LOCALE_ID, useValue: 'pt-BR'},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    DatabaseProvider,
    FornecedorProvider,
    CategoriesProvider,
    ProductProvider,
    VendaProvider,
    ClientProvider,
  ]
})
export class AppModule {}
