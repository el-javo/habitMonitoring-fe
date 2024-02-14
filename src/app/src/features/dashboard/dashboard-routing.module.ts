import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'mainGraph' },
      {
        path: 'mainGraph',
        loadChildren: () =>
          import('@features/dashboard/views/main-graph/main-graph.module').then(
            (m) => m.MainGraphModule
          ),
      },
      {
        path: 'todayHabits',
        loadChildren: () =>
          import(
            '@features/dashboard/views/today-habits/today-habits.module'
          ).then((m) => m.TodayHabitsModule),
      },
      {
        path: 'historic',
        loadChildren: () =>
          import('@features/dashboard/views/historic/historic.module').then(
            (m) => m.HistoricModule
          ),
      },
      {
        path: 'habits',
        loadChildren: () =>
          import('@features/dashboard/views/habits/habits.module').then(
            (m) => m.HabitsModule
          ),
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
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
