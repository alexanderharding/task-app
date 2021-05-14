import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [NavbarComponent, NotFoundComponent],
  imports: [SharedModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
