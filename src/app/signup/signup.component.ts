import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  ngOnInit() {
    const signInButton = document.getElementById("signInButton");
    if (signInButton) {
      signInButton.addEventListener("click", this.redirectToSignIn.bind(this));
    }
    else {
      console.log("Sign is null");
    }

    this.extractTokenFromUrl();
  }

  redirectToSignIn() {
    var redirectUrl = encodeURIComponent(window.location.href);
    console.log(redirectUrl);
    redirectUrl += "home";
    console.log(redirectUrl);
    const awsCognitoLoginUrl = `https://cloudassignment2.auth.us-east-1.amazoncognito.com/login?client_id=5kddch36mbqa9fpkm9refh7ssm&response_type=token&scope=email+openid+phone&redirect_uri=${redirectUrl}`;
    window.location.href = awsCognitoLoginUrl;
  }

  extractTokenFromUrl() {
    const url = new URL(window.location.href);
    const token = url.searchParams.get("token");
    if (token) {
      // Do something with the token
      console.log(token);
    }
    else {
      console.log('token is null');
    }
  }

}
