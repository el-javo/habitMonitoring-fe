import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimengModule } from './primeng/primeng.module';
import { ServicesModule } from './services/services.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [],
  imports: [CommonModule, PrimengModule, ServicesModule, HttpClientModule],
  exports: [PrimengModule],
})
export class SharedModule {}
