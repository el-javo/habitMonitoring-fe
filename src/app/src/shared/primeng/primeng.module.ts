import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [],
  imports: [CommonModule, ButtonModule, DropdownModule, InputTextModule],
  exports: [ButtonModule, DropdownModule, InputTextModule],
})
export class PrimengModule {}
