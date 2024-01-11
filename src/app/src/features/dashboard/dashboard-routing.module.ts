import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    // children: [
    //   { path: '', pathMatch: 'full', redirectTo: 'todayHabits' },
    //   {
    //     path: 'todayHabits',
    //     loadChildren: () =>
    //       import(
    //         '@features/dashboard/views/todayHabits/todayHabits.module'
    //       ).then((m) => m.todayHabitsModule),
    //   },
    //   {
    //     path: '**',
    //     redirectTo: 'dashboard',
    //   },
    // ],
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
export class DashboardRoutingModule {}
