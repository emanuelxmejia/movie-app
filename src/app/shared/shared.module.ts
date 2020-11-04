import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';

// --- components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardsComponent } from './components/cards/cards.component';

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
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    CardsComponent
  ]
})
export class SharedModule { }
