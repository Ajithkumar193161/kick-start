import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AuthModule } from './modules/auth/auth.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpLoadingDialogService } from './shared/loading/loading-dialog/loading-dialog.service';
import { HttpCoreHandlerModule } from './shared/HttpCoreHandler/httpcorehandler.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     AuthModule,
     SharedModule,
     HttpCoreHandlerModule
    ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
     HttpLoadingDialogService,],
  bootstrap: [AppComponent],

})
export class AppModule {}
