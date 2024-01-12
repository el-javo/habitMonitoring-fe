import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodayHabitsComponent } from './today-habits.component';

const routes: Routes = [
  {
    path: '',
    component: TodayHabitsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayHabitsRoutingModule {}
