import { Component, OnInit } from '@angular/core';
import { AuthService, ScopesBuilder, AuthConfig, TokenService } from 'spotify-auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
  <span>Login with</span>
  <div class="img-container">
    <img src="assets/spotify.png" (click)="login()" />
  </div>`,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private tokenSvc: TokenService, private router: Router) { }

  ngOnInit() {
    if(!!this.tokenSvc.oAuthToken){
      this.router.navigate(['user']);
    }
  }

  public login(): void {
    const scopes = new ScopesBuilder()/* .withScopes(ScopesBuilder.LIBRARY) */.build();
    const ac: AuthConfig = {
      client_id: "3af5f43840144db2a5ef883b56c5fb7e",  // WebPortal App Id. Shoud be config
      response_type: "token",
      redirect_uri: "http://7jpsan.github.io/spotify-auth-demo/authorized",  // My URL
      state: "",
      show_dialog: true,
      scope: scopes
    };
    this.authService.configure(ac).authorize();
  }
}
