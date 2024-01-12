import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './user.service';
import { HabitsService } from './habit.service';
import { HabitRegistryService } from './habitRegistry.service';
import { MoodRegistryService } from './moodRegistry.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    UserService,
    HabitsService,
    HabitRegistryService,
    MoodRegistryService,
  ],
})
export class ServicesModule {}
