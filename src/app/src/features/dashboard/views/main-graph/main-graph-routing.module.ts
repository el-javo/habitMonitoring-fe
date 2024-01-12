import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGraphComponent } from './main-graph.component';

const routes: Routes = [
  {
    path: '',
    component: MainGraphComponent,
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
export class MainGraphRoutingModule {}
