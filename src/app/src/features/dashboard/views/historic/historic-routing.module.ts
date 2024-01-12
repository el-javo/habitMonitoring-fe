import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricComponent } from './historic.component';

const routes: Routes = [
  {
    path: '',
    component: HistoricComponent,
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
export class HistoricRoutingModule {}
