import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { SliderModule } from 'primeng/slider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ChartModule } from 'primeng/chart';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    DropdownModule,
    SelectButtonModule,
    InputTextModule,
    FormsModule,
    PanelModule,
    MultiSelectModule,
    SliderModule,
    InputSwitchModule,
    ChartModule,
    CalendarModule,
  ],
  exports: [
    ButtonModule,
    DropdownModule,
    InputTextModule,
    SelectButtonModule,
    MultiSelectModule,
    FormsModule,
    PanelModule,
    SliderModule,
    InputSwitchModule,
    ChartModule,
    CalendarModule,
  ],
})
export class PrimengModule {}
