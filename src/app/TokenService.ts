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
    this.idToken = token;
  }

  getIdToken(): string | null {
    return this.idToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }
}
