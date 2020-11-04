import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule
  ],
  exports: [
    MatDialogModule
  ],
})
export class MaterialModule { }
