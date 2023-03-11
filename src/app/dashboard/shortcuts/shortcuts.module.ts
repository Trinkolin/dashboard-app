import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortcutsComponent } from './shortcuts.component';
import { ConsultShortcutComponent } from './consult-shortcut/consult-shortcut.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    ShortcutsComponent,
    ConsultShortcutComponent
  ],
  exports: [
    ShortcutsComponent,
  ],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    CommonModule
  ]
})
export class ShortcutsModule {
}
