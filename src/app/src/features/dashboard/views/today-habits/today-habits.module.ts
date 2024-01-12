import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodayHabitsRoutingModule } from './today-habits-routing.module';
import { TodayHabitsComponent } from './today-habits.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [TodayHabitsComponent],
  imports: [CommonModule, TodayHabitsRoutingModule, SharedModule],
})
export class TodayHabitsModule {}
