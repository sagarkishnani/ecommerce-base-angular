import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';



@NgModule({
  exports: [
    ButtonModule,
    DropdownModule,
    TableModule,
    InputTextModule,
    CardModule
  ],
  providers: [
  ]
})
export class PrimeNgModule { }