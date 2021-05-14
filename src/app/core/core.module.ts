import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [NavbarComponent, LoginComponent],
  imports: [SharedModule],
  exports: [NavbarComponent],
})
export class CoreModule {}
