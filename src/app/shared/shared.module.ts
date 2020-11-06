import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

// --- components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardsComponent } from './components/cards/cards.component';
import { RouterModule } from '@angular/router';

// --- dialogs

// --- pipes

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    CardsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    CardsComponent
  ]
})
export class SharedModule { }
