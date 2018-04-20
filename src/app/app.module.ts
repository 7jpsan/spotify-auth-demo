import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';
import { AppComponent }  from './app.component';
import { InfoService }  from './info.service';
import { Routes, RouterModule, Router } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user.component';
import { LoginComponent } from './login.component';
import { AlbumsComponent } from './albums.component';
import { SpotifyAuthModule } from 'spotify-auth';
import { SpotifyAuthInterceptor2 } from './spotify-auth.interceptor';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'user',
    pathMatch: 'full'
  },
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'albums',
    component: AlbumsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  SpotifyAuthModule.authRoutes()[0]
];

@NgModule({
  imports:      [ 
    BrowserModule,
    HttpClientModule,
    HttpModule,
    SpotifyAuthModule.forRoot(),
    RouterModule.forRoot(routes, {
      // useHash: true
    }),
  ],
  declarations: [ AppComponent, UserComponent, LoginComponent, AlbumsComponent ],
  bootstrap:    [ AppComponent ],
  exports: [],
  providers: [ 
    InfoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpotifyAuthInterceptor2, //Force interception.
      multi: true
    }
  ]
})
export class AppModule {}
