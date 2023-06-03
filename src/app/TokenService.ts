import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  private idToken: string | null;
  private accessToken: string | null;

  constructor() {
    this.idToken = '';
    this.accessToken = '';
  }

  setIdToken(token: string) {
    console.log("token set properlty " + token);
    this.idToken = token;
  }

  getIdToken(): string | null {
    console.log("get  token   " + this.idToken);
    return this.idToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}
