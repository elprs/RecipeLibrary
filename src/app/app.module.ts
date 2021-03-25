import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core.module';

@NgModule({
  declarations: [
    // register all the featutes I introduce
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    //authModula and all the lazy loaded modules are not imported here to avoid eager loading that will happen anyway
    //if we let them here or on the import above, although the lazy loading would also take place
    
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
