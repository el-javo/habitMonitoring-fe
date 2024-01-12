import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainGraphRoutingModule } from './main-graph-routing.module';
import { SharedModule } from '@shared/shared.module';
import { MainGraphComponent } from './main-graph.component';

@NgModule({
  declarations: [MainGraphComponent],
  imports: [CommonModule, MainGraphRoutingModule, SharedModule],
})
export class MainGraphModule {}
