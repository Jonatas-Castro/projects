import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficComponent } from './components/grafic.component';

@NgModule({
  declarations: [GraficComponent],
  imports: [
    CommonModule
  ],
  exports: [GraficComponent]
})
export class GraficModule { }
