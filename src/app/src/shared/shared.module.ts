import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { ServicesModule } from './services/services.module';
import { HttpClientModule } from '@angular/common/http';
import { ApexChartsModule } from './apex-charts/apex-charts.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PrimengModule,
    ServicesModule,
    HttpClientModule,
    ApexChartsModule,
  ],
  exports: [PrimengModule, ApexChartsModule, ServicesModule],
})
export class SharedModule {}
