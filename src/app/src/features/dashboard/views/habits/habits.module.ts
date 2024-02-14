import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HabitsRoutingModule } from './habits-routing.module';
import { SharedModule } from '@shared/shared.module';
import { HabitsComponent } from './habits.component';

@NgModule({
  declarations: [HabitsComponent],
  imports: [CommonModule, HabitsRoutingModule, SharedModule],
})
export class HabitsModule {}
