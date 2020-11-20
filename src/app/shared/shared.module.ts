import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

// --- components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardsComponent } from './components/cards/cards.component';
import { FooterComponent } from './components/footer/footer.component';

// --- dialogs

// --- pipes
import { NomovieposterPipe } from './pipes/nomovieposter.pipe';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    CardsComponent,
    NomovieposterPipe,
    FooterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    CardsComponent,
    FooterComponent
  ]
})
export class SharedModule { }