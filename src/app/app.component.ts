import { Component, OnInit } from '@angular/core';
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from 'spotify-auth';
import { InfoService } from './info.service';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators/filter';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private infoSvc: InfoService,
    private tokenSvc: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.authorizedStream.pipe(filter(x => x)).subscribe(() => {
        this.router.navigate(['user']);
    });
  }

  public logout(): void{
    this.tokenSvc.clearToken();
    this.router.navigate(['login']);
  }
}
