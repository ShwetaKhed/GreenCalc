import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sharedData: any;
  postcode: any;

  constructor() { }
}
