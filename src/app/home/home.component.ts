import { Component } from '@angular/core';
import { TokenService } from 'src/app/TokenService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(private tokenService: TokenService, private router: Router) { }
  ngOnInit() {
    const token = this.extractTokenFromUrl();
    if (token) {
      //console.log(token);
    }
    else {
      console.log("not logged in");
      this.router.navigate(['/']);
    }
  }

  extractTokenFromUrl(): string | null {

    const url = new URL(window.location.href);
    console.log(url);

    const idTokenParam = '#id_token=';
    const accessTokenParam = '&access_token=';

    const idTokenIndex = url.href.indexOf(idTokenParam);
    const accessTokenIndex = url.href.indexOf(accessTokenParam);

    var idToken = "";
    var accessToken = "";

    if (idTokenIndex !== -1 && accessTokenIndex !== -1) {

      idToken = url.href.substring(idTokenIndex + idTokenParam.length, accessTokenIndex);
      const accessTokenEndIndex = url.href.indexOf('&', accessTokenIndex);
      accessToken = url.href.substring(accessTokenIndex + accessTokenParam.length, accessTokenEndIndex !== -1 ? accessTokenEndIndex : undefined);

    }
    this.tokenService.setIdToken(idToken);
    this.tokenService.setAccessToken(accessToken);


    //console.log("access_token =")
    //console.log(accessToken)
    //console.log("id_token =")
    //console.log(idToken)

    return idToken;
  }


}
