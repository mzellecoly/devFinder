import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LangageProgramPipe } from './langage-program.pipe';



@NgModule({
  declarations: [
    LangageProgramPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[LangageProgramPipe]
})
export class SharedModule { }
