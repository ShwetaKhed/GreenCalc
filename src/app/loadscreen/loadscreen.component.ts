import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loadscreen',
  templateUrl: './loadscreen.component.html',
  styleUrls: ['./loadscreen.component.css']
})
export class LoadscreenComponent {
  password: any;

  constructor( private router: Router, private snackBar: MatSnackBar) {

  }

  onLogin(): void {
    if (this.password == "DevMaverick"){
      this.snackBar.open('Login successful!', 'Close', {
        duration: 1000,
      });
      this.router.navigate(['/home']);
    }
    else {
      this.snackBar.open('Invalid Password!!', 'Close', {
        duration: 3000,
      });
    }
  }

}
