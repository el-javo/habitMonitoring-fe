import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { SliderModule } from 'primeng/slider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    PanelModule,
    SliderModule,
    InputSwitchModule,
    ChartModule,
    CalendarModule,
  ],
  exports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    PanelModule,
    SliderModule,
    InputSwitchModule,
    ChartModule,
    CalendarModule,
  ],
})
export class PrimengModule {}
